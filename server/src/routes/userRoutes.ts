import { Router } from "express";
import {
  getUser,
  login,
  signup,
  updateImage,
} from "../controller/userController";
import passport from "../config/passport";

const router = Router();

router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  getUser
);
router.post("/login", login);
router.put("/signup", signup);
router.patch(
  "/updateImage",
  passport.authenticate("jwt", { session: false }),
  updateImage
);

export default router;
