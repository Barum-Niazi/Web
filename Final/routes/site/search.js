const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");

router.get("/search", async (req, res) => {
    const { search } = req.query;
    console.log(search);
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    if (search) {
        if (
            req.session.searchHistory &&
            req.session.searchHistory.slice(-1)[0] !== search
        ) {
            req.session.searchHistory.push(search);
        } else if (!req.session.searchHistory) {
            req.session.searchHistory = [search];
        }
    }

    const searchQuery = search
        ? { name: { $regex: new RegExp(search, "i") } }
        : {};

    console.log(searchQuery);
    const totalGames = await Game.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalGames / limit);
    const games = await Game.find(searchQuery)
        .skip((page - 1) * limit)
        .limit(limit);

    res.render("search", {
        games,
        currentPage: page,
        totalPages,
        search,
    });
});

module.exports = router;
