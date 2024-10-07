import express from "express";
import userRoutes from "./routes/userRoutes";

// Create an app
const app = express();

// Add middlewares
app.use(express.json());

// Add routes
app.use("/users", userRoutes);

// Select the right port to run the application
const port = process.env.PORT || 5000;

// Listen to changes from selected port
app.listen(port, () => {
  console.log("Server is running on port ->", port);
});
