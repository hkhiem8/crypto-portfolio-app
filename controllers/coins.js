const express = require('express');
const router = express.Router();
const Coin = require('../models/coin');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const verifyToken = require('../middleware/verify-token');
const UNIBLOCK_API_KEY = process.env.UNIBLOCK_API_KEY

// Get coin details (name, symbol, image, current USD price, 24 hour price change)
router.get('/getdetails', verifyToken, async (req, res) => {
    try {
        const coinId = req.query.coinId;

        const response = await fetch(`https://api.uniblock.dev/direct/v1/CoinGecko/coins/${coinId}`,
            {
                headers: {
                    "x-api-key": UNIBLOCK_API_KEY
                }
            });
        const responseBody = await response.json();

        if (response.ok) {
            const coinDetails = {
                name: responseBody.name,
                symbol: responseBody.symbol,
                image: responseBody.image.large,
                currentPriceUSD: responseBody.market_data.current_price.usd,
                priceChange24Hrs: responseBody.market_data.price_change_percentage_24h
            };
            res.status(200).send({ coinDetails });
        } else {
            res.status(400).json({ error: 'Error fetching coin data from UniBlock API' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add/or update coins
router.post('add-coin', async (req, res) => {
    try {
        const coinId = req.body.coinId;

        const response = await fetch(`https://api.uniblock.dev/direct/v1/CoinGecko/coins/${coinId}`,
            {
                headers: {
                    "x-api-key": UNIBLOCK_API_KEY
                }
            });
        const responseBody = await response.json();

        if (response.ok) {
            const coinDetails = {
                coinId: coinId,
                name: responseBody.name,
                symbol: responseBody.symbol,
                image: responseBody.image.large,
                currentPriceUSD: responseBody.market_data.current_price.usd,
                priceChange24Hrs: responseBody.market_data.price_change_percentage_24h
            };

            // Check if the coin already exists in the database
            const existingCoin = await Coin.findOne({ coinId });

            if (existingCoin) {
                // If the coin exists, update it with the new data
                await Coin.updateOne({ coinId }, coinDetails);
                return res.status(200).json({ message: 'Coin updated in the database', coin: coinDetails });
            } else {
                // If the coin doesn't exist, create a new one
                const newCoin = new Coin(coinDetails);
                await newCoin.save();
                res.status(201).json({ message: 'Coin added to database', coin: newCoin });
            }
        } else {
            res.status(400).json({ error: 'Error fetching coin data from UniBlock API' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Index - view all coins in the database
router.get('/coins', async (req, res) => {
    try {
        // Retrieve all coins from the database
        const coins = await Coin.find({});
        res.status(200).json({ coins });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;