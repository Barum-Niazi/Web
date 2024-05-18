const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("landingpage");
});

router.get("/api", (req, res) => {
    res.render("api");
});

module.exports = router;
