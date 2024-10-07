"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create an app
const app = (0, express_1.default)();
// Select the right port to run the application
const port = process.env.PORT || 5000;
// Listen to changes from selected port
app.listen(port, () => {
    console.log("Server is running on port ->", port);
});
