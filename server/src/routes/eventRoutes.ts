import { Router } from "express";
import { getAllEvents } from "../controller/eventController";

const router = Router();

router.get("/getAllEvents", getAllEvents);

export default router;
