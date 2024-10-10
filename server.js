require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const usersRouter = require('./controllers/users');
const coinsRouter = require('./controllers/coins');
const watchlistsRouter = require('./controllers/watchlists');
const cors = require('cors');

const MONGO_URI = process.env.MONGO_URI


const port = process.env.PORT ? process.env.PORT : "3000";

app.use(express.json())
app.use(cors())

mongoose.connect(MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("MongoDB is up and running");
});

mongoose.connection.on("error", () => {
  console.log("MongoDB error");
});

app.use('/users', usersRouter);
app.use('/coins', coinsRouter);
app.use('/watchlists', watchlistsRouter);

app.listen(port, () => {
    console.log(`app is ready on port ${port}!`);
  });