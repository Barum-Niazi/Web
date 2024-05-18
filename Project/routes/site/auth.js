const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("auth/login", { layout: false });
});

router.get("/register", (req, res) => {
    res.render("auth/register", { layout: false });
});

module.exports = router;
