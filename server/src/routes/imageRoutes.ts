import { Router } from "express";
import upload from "../middlewares/multer";

const router = Router();

router.post("/upload", upload.single("userImage"), (req, res) => {
  console.log("REQUEST FILE", req.file);
  console.log("REQUEST BODY", req.body);
  res.status(200).json({
    msg: "Working",
  });
});

export default router;
