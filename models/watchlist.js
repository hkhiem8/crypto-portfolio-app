const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    coins: [{
        type: Schema.Types.ObjectId,  // Reference to the cryptocurrencies in this watchlist
        ref: 'Coin'
    }],
    userId: {
        type: Schema.Types.ObjectId,  // Reference to the user who owns this watchlist
        ref: 'User',
        required: true
    },
},
{ timestamps: true }
);

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;