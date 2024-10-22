import { Router } from "express";
import {
  getAllEvents,
  getAllEventsByDate,
} from "../controller/eventController";

const router = Router();

router.get("/getAllEvents", getAllEvents);
router.post("/getAllByDate", getAllEventsByDate);

export default router;
