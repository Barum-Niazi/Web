const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");

router.get("/store", async (req, res) => {
    res.render("store");
});

module.exports = router;
