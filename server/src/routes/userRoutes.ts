import { Router } from "express";
import { getUser, login, signup } from "../controller/userController";
import passport from "../config/passport";

const router = Router();

router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  getUser
);
router.post("/login", login);
router.put("/signup", signup);

export default router;
