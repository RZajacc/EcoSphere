import { Router } from "express";
import {
  getAllUsers,
  getUser,
  login,
  signup,
} from "../controller/userController";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUser", getUser);
router.post("/login", login);
router.put("/signup", signup);

export default router;
