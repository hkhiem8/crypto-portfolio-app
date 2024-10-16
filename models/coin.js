const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  currentPriceUSD: {
    type: Number,
    required: true,
  },
  priceChange24Hrs: {
    type: Number,
    required: true,
  },
});

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;
