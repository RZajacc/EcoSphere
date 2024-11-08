import { RequestHandler } from "express";
import { Storage } from "@google-cloud/storage";
import ExifReader from "exifreader";

const storage = new Storage({ projectId: process.env.PROJECT_ID });
const bucketName = "ecosphere-images";
// const myBucket = storage.bucket("ecosphere-images")

const uploadImage: RequestHandler = async (req, res) => {
  if (!req.file) {
    res.status(404).json({
      msg: "No file was provided!",
    });
  }

  const destFileName = req.file!.originalname;
  const contents = req.file!.buffer;

  // const image = await storage
  //   .bucket(bucketName)
  //   .file("userImages/" + destFileName)
  //   .save(contents);
  // console.log(
  //   `${destFileName} with contents ${contents} uploaded to ${bucketName}.`
  // );

  // Extract image metadata
  const tags = ExifReader.load(contents);
  // Image metdatada
  const format = tags["Format"].value;
  const width = tags["Image Width"]?.value;
  const height = tags["Image Height"]?.value;

  res.status(200).json({
    msg: "Working",
    // image,
  });
};

export { uploadImage };
