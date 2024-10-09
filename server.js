require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI

const port = process.env.PORT ? process.env.PORT : "3000";

app.use(express.json())

mongoose.connect(MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("MongoDB is up and running");
});

mongoose.connection.on("error", () => {
  console.log("MongoDB error");
});

app.listen(port, () => {
    console.log(`app is ready on port ${port}!`);
  });