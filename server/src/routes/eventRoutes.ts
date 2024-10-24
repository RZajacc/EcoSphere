import { Router } from "express";
import {
  getAllEventsByDate,
  getEventByTitle,
} from "../controller/eventController";

const router = Router();

router.post("/getAllByDate", getAllEventsByDate);
router.post("/getEventByTitle", getEventByTitle);

export default router;
