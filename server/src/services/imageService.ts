import { Storage } from "@google-cloud/storage";
import ExifReader from "exifreader";
import * as db from "../db/index";
import { QueryResult } from "pg";

const storage = new Storage({ projectId: process.env.PROJECT_ID });
const bucketName = "ecosphere-images";

export const uploadImage = async (
  file: Express.Multer.File,
  folder?: string
) => {
  // Prepare data to upload image
  const uniqueSuffix = Date.now();
  const destFileName = file.originalname + "_" + uniqueSuffix;
  const contents = file.buffer;
  // Try uploading the image

  try {
    await storage
      .bucket(bucketName)
      .file(`${folder ? folder + "/" : ""}` + destFileName)
      .save(contents);
  } catch (error) {
    console.log(error);
  }

  // Extract image metadata
  const tags = ExifReader.load(contents);

  // Image metdatada
  const format = tags["FileType"].value;
  const width = tags["Image Width"]?.value;
  const height = tags["Image Height"]?.value;
  const imageURL = `https://storage.googleapis.com/ecosphere-images/${
    folder ? folder + "/" : ""
  }${destFileName}`;
  const name = folder + "/" + destFileName;
  // Save image in the database
  try {
    const result: QueryResult<{ image_id: number }> | void = await db.query(
      `INSERT INTO images (name, format, width, height, imageurl) VALUES ('${name}', '${format}', ${width}, ${height}, '${imageURL}') RETURNING image_id`
    );

    if (result && result.rowCount != 0) {
      return result.rows[0].image_id;
    } else {
      throw new Error("Something went wront with uploading the image!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateImageOwner = async (
  image_id: number,
  user_id?: number,
  event_id?: number
) => {
  // Prepare an object to simplify query
  let valueToUpdate: { varName: string; value: number | undefined };

  // If both user and event id's are provided return an error
  if (user_id && event_id) {
    throw new Error(
      "You can update only one value but you have provided both!"
    );
  } else {
    // Assign value to be updated
    valueToUpdate = {
      varName: user_id ? "user_id" : "event_id",
      value: user_id ? user_id : event_id,
    };

    // Perform update of the image object
    try {
      const result: QueryResult | void = await db.query(
        `UPDATE images SET ${valueToUpdate.varName} = ${valueToUpdate.value} WHERE image_id = ${image_id}`
      );
      if (result) {
        return "Update successcull";
      } else {
        throw new Error("Something went wrong with updating image");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateUserImg = async (imageId: number, userId: number) => {
  try {
    // Check if the user already have an image stored in the db
    const userImageId: QueryResult<{ image_id: number }> | void =
      await db.query(`SELECT image_id FROM users WHERE user_id=${userId}`);

    // If yes delete old image from google cloud and update it with the new one
    if (userImageId && userImageId.rows[0].image_id !== null) {
      const imageIdToDelete = userImageId.rows[0].image_id;

      // Get image name for the file you wish to delete
      const imageName: QueryResult<{ name: string }> | void = await db.query(
        `SELECT name FROM images where image_id=${imageIdToDelete}`
      );

      if (imageName && imageName.rowCount != 0) {
        const fileName = imageName.rows[0].name;

        //  Get file metadata from GCP
        const [metadata] = await storage
          .bucket(bucketName)
          .file(fileName)
          .getMetadata();

        // Delete the file
        const deleteOptions = {
          ifGenerationMatch: metadata.generation,
        };

        await storage.bucket(bucketName).file(fileName).delete(deleteOptions);

        // Else just add new image id to the user
        const result: QueryResult | void = await db.query(
          `UPDATE users SET image_id=${imageId} WHERE user_id=${userId}`
        );

        // Delete previous image from the DB
        const deleteResult: QueryResult | void = await db.query(
          `DELETE FROM images WHERE image_id=${imageIdToDelete}`
        );
      }
    } else {
      // Else just add new image id to the user
      const result: QueryResult | void = await db.query(
        `UPDATE users SET image_id=${imageId} WHERE user_id=${userId}`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed uploading image: " + error.message);
    } else {
      throw new Error("Failed uploading image");
    }
  }
};
