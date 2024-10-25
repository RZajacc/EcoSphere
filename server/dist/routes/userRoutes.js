"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get("/getAllUsers", userController_1.getAllUsers);
router.post("/login", userController_1.login);
router.put("/signup", userController_1.signup);
exports.default = router;
