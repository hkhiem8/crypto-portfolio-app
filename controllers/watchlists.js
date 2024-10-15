const express = require("express");
const router = express.Router();
const Watchlist = require("../models/watchlist");
const verifyToken = require("../middleware/verify-token");

// Create a new watchlist
router.post("/", verifyToken, async (req, res) => {
  try {
    const newWatchlist = new Watchlist({
      name: req.body.name,
      description: req.body.description,
      coins: req.body.coins || [],
      userId: req.user._id,
    });
    await newWatchlist.save();
    res
      .status(201)
      .json(newWatchlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add coins to the watchlist by mongoDB ID
router.patch("/:id/add-coin", verifyToken, async (req, res) => {
  try {
    const newCoins = req.body.coins;

    const watchlist = await Watchlist.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    newCoins.forEach((coin) => {
      if (!watchlist.coins.includes(coin)) {
        watchlist.coins.push(coin);
      }
    });

    await watchlist.save();

    res.status(201).json({ message: "Coin added to watchlist", watchlist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove coins from the watchlist by mongoDB ID
router.patch("/:id/remove-coin", verifyToken, async (req, res) => {
  try {
    const oldCoins = req.body.coins;

    const watchlist = await Watchlist.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    watchlist.coins = watchlist.coins.filter(
      (coin) => !oldCoins.includes(coin.toString())
    );

    await watchlist.save();
    res.status(200).json({ message: "Coin removed from watchlist", watchlist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all watchlists for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const watchlists = await Watchlist.find({ userId: req.user._id }).populate(
      "coins"
    );
    res.status(200).json( watchlists || [] );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific watchlist by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const watchlist = await Watchlist.findById(req.params.id).populate("coins");
    if (!watchlist || watchlist.userId.toString() !== req.user._id) {
      return res
        .status(404)
        .json({ error: "Watchlist not found or unauthorized" });
    }
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a watchlist
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedWatchlist = await Watchlist.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        coins: req.body.coins,
      },
      { new: true }
    );
    if (
      !updatedWatchlist ||
      updatedWatchlist.userId.toString() !== req.user._id
    ) {
      return res
        .status(404)
        .json({ error: "Watchlist not found or unauthorized" });
    }
    res
      .status(200)
      .json({ message: "Watchlist updated", watchlist: updatedWatchlist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a watchlist
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const watchlist = await Watchlist.findByIdAndDelete(req.params.id);
    if (!watchlist || watchlist.userId.toString() !== req.user._id) {
      return res
        .status(404)
        .json({ error: "Watchlist not found or unauthorized" });
    }
    res.status(200).json({ message: "Watchlist deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
