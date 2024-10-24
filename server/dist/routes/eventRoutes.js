"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controller/eventController");
const router = (0, express_1.Router)();
router.post("/getAllByDate", eventController_1.getAllEventsByDate);
router.post("/getEventByTitle", eventController_1.getEventByTitle);
exports.default = router;
