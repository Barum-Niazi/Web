const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("landingpage");
});

router.get("/contact-us", (req, res) => {
    res.render("contact-us");
});

router.get("/api", (req, res) => {
    res.render("api");
});

module.exports = router;
