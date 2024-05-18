const express = require("express");
const router = express.Router();

router.get("/contact-us", (req, res) => {
    res.render("contact-us");
});

module.exports = router;
