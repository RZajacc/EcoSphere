"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const passport_1 = __importDefault(require("../config/passport"));
const router = (0, express_1.Router)();
router.get("/getAllUsers", userController_1.getAllUsers);
router.get("/getUser", passport_1.default.authenticate("jwt", { session: false }), userController_1.getUser);
router.post("/login", userController_1.login);
router.put("/signup", userController_1.signup);
exports.default = router;
