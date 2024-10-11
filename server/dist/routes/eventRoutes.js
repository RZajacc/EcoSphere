"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controller/eventController");
const router = (0, express_1.Router)();
router.get("/getAllEvents", eventController_1.getAllEvents);
exports.default = router;
