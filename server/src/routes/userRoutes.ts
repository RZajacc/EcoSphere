import { Router } from "express";
import { getAllUsers, signup } from "../controller/userController";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.put("/signup", signup);

export default router;
