"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
// Create an app
const app = (0, express_1.default)();
// Add middlewares
app.use(express_1.default.json());
// Add routes
app.use("/users", userRoutes_1.default);
app.use("/events", eventRoutes_1.default);
// Select the right port to run the application
const port = process.env.PORT || 5000;
// Listen to changes from selected port
app.listen(port, () => {
    console.log("Server is running on port ->", port);
});
