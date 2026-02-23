require("dotenv").config();
const express = require("express");
const app = express();
//
const port = process.env.PORT || 8000;

const user = {
  id: "1",
  name: "Eman Nazir",
  email: "eman@gmail.com",
  age: 22,
  isLoggedIn: true,
  role: "Developer",
  address: {
    city: "Lahore",
    country: "Pakistan",
  },
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
  res.send("hin@dotcom");
});

app.get("/login", (req, res) => {
  res.send("<h1>PLease login</h1>");
});

app.get("/user", (req, res) => {
  res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
