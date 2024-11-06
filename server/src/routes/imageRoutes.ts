import { Router } from "express";
import upload from "../middlewares/multer";
import { uploadImage } from "../controller/imagesController";

const router = Router();

router.post("/upload", upload.single("userImage"), uploadImage);

export default router;
