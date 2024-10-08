import { Router } from "express";
import { getAllUsers } from "../controller/userController";

const router = Router();

router.get("/getAllUsers", getAllUsers);

export default router;
