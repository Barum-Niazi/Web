const express = require("express");
const router = express.Router();

router.get("/contact-us", (req, res) => {
    res.render("contact-us", { page: "contact-us" });
});

module.exports = router;
