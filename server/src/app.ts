import express from "express";

// Create an app
const app = express();

// Select the right port to run the application
const port = process.env.PORT || 5000;

// Listen to changes from selected port
app.listen(port, () => {
  console.log("Server is running on port ->", port);
});
