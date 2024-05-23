const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");
const attachToken = require("../../middlewares/attachToken");

router.get("/", async (req, res) => {
    games = await Game.aggregate([{ $sample: { size: 10 } }]);
    customersChoice = await Game.aggregate([{ $sample: { size: 4 } }]);
    carouselGames = await Game.aggregate([{ $sample: { size: 8 } }]);
    res.render("landingpage", { games, customersChoice });
});

router.get("/api", (req, res) => {
    res.render("api");
});

module.exports = router;
