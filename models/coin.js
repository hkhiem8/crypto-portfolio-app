const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
    coinId: {
        type: String,
        required: true,
        unique: true
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
        type: number,
        required: true,
    },
    priceChange24Hrs: {
        type: number,
        required: true,
    },
},
);

const Coin = mongoose.model("Coin", tokenSchema);

module.exports = Coin;