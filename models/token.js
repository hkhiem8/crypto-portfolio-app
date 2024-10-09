const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    tokenId: {
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

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;