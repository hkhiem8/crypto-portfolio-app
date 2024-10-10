const express = require('express');
const router = express.Router();
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
            res.status(200).send({ tokenDetails });
        } else {
            res.status(400).json({ error: 'Error fetching coin price' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;