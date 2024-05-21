const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");

router.get("/store", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 25;
    const totalGames = await Game.countDocuments();
    const totalPages = Math.ceil(totalGames / limit);
    const games = await Game.find()
        .skip((page - 1) * limit)
        .limit(limit);

    res.render("store", {
        games,
        currentPage: page,
        totalPages,
    });
});

router.get("/store/genre/:genre", async (req, res) => {
    const { genre } = req.params;
    const pageNum = parseInt(req.query.page) || 1;
    const limit = 25;
    const totalGames = await Game.countDocuments({ genres: genre });
    console.log(totalGames, genre, pageNum, limit);
    const totalPages = Math.ceil(totalGames / limit);
    const games = await Game.find({ genres: genre })
        .skip((pageNum - 1) * limit)
        .limit(limit);

    console.log(genre, pageNum, totalPages, totalGames);
    res.render("store", {
        games,
        currentPage: pageNum,
        totalPages,
    });
});

router.get("/store/description/:name", async (req, res) => {
    const { name } = req.params;
    const game = await Game.findOne({ name });
    res.render("description");
});

module.exports = router;
