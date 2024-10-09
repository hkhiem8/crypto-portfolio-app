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
    tokens: [{
        type: Schema.Types.ObjectId,  // Reference to the cryptocurrencies in this watchlist
        ref: 'Token'
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;