import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import passport from "./config/passport";

// Create an app
const app = express();

// Add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

// Add routes
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

// Select the right port to run the application
const port = process.env.PORT || 5000;

// Listen to changes from selected port
app.listen(port, () => {
  console.log("Server is running on port ->", port);
});
