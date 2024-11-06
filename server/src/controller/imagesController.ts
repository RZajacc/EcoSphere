import { RequestHandler } from "express";

const uploadImage: RequestHandler = (req, res) => {
  res.status(200).json({
    msg: "Working",
  });
};

export { uploadImage };
