const express = require("express");
const router = express.Router();
const sessionAuth = require("../../middlewares/sessionAuth");

router.get("/contact-us", sessionAuth, (req, res) => {
    res.render("contact-us");
});

module.exports = router;
