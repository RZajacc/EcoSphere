import { RequestHandler } from "express";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({ projectId: process.env.PROJECT_ID });

async function listBuckets() {
  const [buckets] = await storage.getBuckets();
  console.log("Buckets:");
  buckets.forEach((bucket) => {
    console.log(bucket.name);
  });
}

listBuckets().catch(console.error);

const uploadImage: RequestHandler = (req, res) => {
  res.status(200).json({
    msg: "Working",
  });
};

export { uploadImage };
