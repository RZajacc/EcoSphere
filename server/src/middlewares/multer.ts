import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + uniqueSuffix);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Get the file extension
  const fileExt = path.extname(file.originalname);
  // List of accepted file extensions
  const allowedExt = [".bmp", ".jpg", ".jpeg", ".png"];

  // Accept the file if it includes extension
  if (allowedExt.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
