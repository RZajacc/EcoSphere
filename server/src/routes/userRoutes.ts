import { Router } from "express";
import { getAllUsers, login, signup } from "../controller/userController";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.post("/login", login);
router.put("/signup", signup);

export default router;
