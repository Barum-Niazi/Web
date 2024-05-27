const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    coverImage: {
        type: String,
        required: true,
    },
    backgroundImage: {
        type: String,
        required: true,
    },
    genres: [
        {
            type: String,
            required: true,
        },
    ],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
