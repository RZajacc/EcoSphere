import { RequestHandler } from "express";
import { Storage } from "@google-cloud/storage";
import ExifReader from "exifreader";
import * as db from "../db/index";
import { QueryResult } from "pg";

const storage = new Storage({ projectId: process.env.PROJECT_ID });
const bucketName = "ecosphere-images";

const uploadImage: RequestHandler = async (req, res) => {
  // Define inputs
  const inputs: { folder?: string } = req.body;

  if (!req.file) {
    res.status(404).json({
      msg: "No file was provided!",
    });
  } else {
    // Prepare data to upload image
    const uniqueSuffix = Date.now();
    const destFileName = req.file.originalname + "_" + uniqueSuffix;
    const contents = req.file.buffer;
    // Try uploading the image
    try {
      await storage
        .bucket(bucketName)
        .file(`${inputs.folder ? inputs.folder + "/" : ""}` + destFileName)
        .save(contents);
    } catch (error) {
      res.status(500).json(error);
    }

    // Extract image metadata
    const tags = ExifReader.load(contents);
    // Image metdatada
    const format = tags["Format"].value;
    const width = tags["Image Width"]?.value;
    const height = tags["Image Height"]?.value;
    const imageURL = `https://storage.googleapis.com/ecosphere-images/${
      inputs.folder ? inputs.folder + "/" : ""
    }${destFileName}`;
    // Save image in the database
    try {
      const result: QueryResult<{ image_id: number }> | void = await db.query(
        `INSERT INTO images (format, width, height, imageurl) VALUES ('${format}', ${width}, ${height}, '${imageURL}') RETURNING image_id`
      );

      if (result && result.rowCount != 0) {
        res.status(200).json({
          msg: "Image successfully uploaded",
          data: {
            image_id: result.rows[0].image_id,
            format: format,
            width: width,
            height: height,
            imageURL: imageURL,
          },
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const updateImageOwner: RequestHandler = async (req, res) => {
  // Define inputs
  const inputs: { user_id?: number; event_id?: number; image_id: number } =
    req.body;

  // Prepare an object to simplify query
  let valueToUpdate: { varName: string; value: number | undefined };

  // If both user and event id's are provided return an error
  if (inputs.user_id && inputs.event_id) {
    res.status(500).json({
      err: "You can update only one value but you have provided both!",
    });
  } else {
    // Assign value to be updated
    valueToUpdate = {
      varName: inputs.user_id ? "user_id" : "event_id",
      value: inputs.user_id ? inputs.user_id : inputs.event_id,
    };

    // Perform update of the image object
    try {
      const result: QueryResult | void = await db.query(
        `UPDATE images SET ${valueToUpdate.varName} = ${valueToUpdate.value} WHERE image_id = ${inputs.image_id}`
      );
      if (result) {
        res.status(200).json({
          msg: "Update successcull",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export { uploadImage, updateImageOwner };