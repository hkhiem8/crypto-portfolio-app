const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     unique: true,
    // },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    watchlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "watchlist",
        },
    ],
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;