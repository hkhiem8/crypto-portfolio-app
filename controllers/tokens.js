const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verify-token');
const UNIBLOCK_API_KEY = process.env.UNIBLOCK_API_KEY

// get price
router.get('/getprice', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const tokenId = req.query.tokenId

        const response = await fetch(`https://api.uniblock.dev/direct/v1/CoinGecko/coins/${tokenId}`,
            {
                headers: {
                    "x-api-key": UNIBLOCK_API_KEY
                }
            });

        const responseBody = await response.json()
        if (response.ok) {
            res.status(200).send({
                price: responseBody.market_data.current_price.usd
            })
        } else {
            console.log(responseBody)
            res.status(400).json({ error: 'Error fetching coin price' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
)

// get portfolio
 // use decoded._id

module.exports = router;