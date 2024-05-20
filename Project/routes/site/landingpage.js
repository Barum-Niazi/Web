const express = require("express");
const router = express.Router();
const fetchGames = require("../../middlewares/gameMiddleware");

router.get("/", fetchGames, (req, res) => {
    res.render("landingpage");
});

router.get("/api", (req, res) => {
    res.render("api");
});

module.exports = router;
