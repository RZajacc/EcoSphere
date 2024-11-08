import { Router } from "express";
import upload from "../middlewares/multer";
import { updateImageOwner, uploadImage } from "../controller/imagesController";

const router = Router();

router.post("/upload", upload.single("userImage"), uploadImage);
router.patch("/updateImageOwner", updateImageOwner);

export default router;
