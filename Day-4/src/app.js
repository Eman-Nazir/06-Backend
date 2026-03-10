import express from "express";

const app = express();



// Routes (example)
app.get("/", (req, res) => {
  res.send("API is running!");
});

export default app;