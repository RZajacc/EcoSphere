import { Router } from "express";
import { getAllEventsByDate } from "../controller/eventController";

const router = Router();

router.post("/getAllByDate", getAllEventsByDate);

export default router;
