// const express = require("express")
import express from "express"; //module js
const app = express();
// // Middleware to serve static files from the frontend dist folder

app.use(express.static("dist"));
// app.get("/" , (req,res) =>{
//     res.send("Server is Ready ")
// })
//  get a list of 5 jokes
app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Why did the scarecrow win an award?",
      content: "Because he was outstanding in his field!",
    },
    {
      id: 2,
      title: "Why don't scientists trust atoms?",
      content: "Because they make up everything!",
    },
    {
      id: 3,
      title: "Why did the math book look sad?",
      content: "Because it had too many problems.",
    },
    {
      id: 4,
      title: "Why did the bicycle fall over?",
      content: "Because it was two-tired!",
    },
    {
      id: 5,
      title: "Why did the coffee file a police report?",
      content: "It got mugged.",
    },
  ];
  res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
