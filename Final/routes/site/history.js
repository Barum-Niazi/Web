const express = require("express");
const router = express.Router();

router.get("/history", (req, res) => {
    searchHistory = req.session.searchHistory || [];
    res.render("history", {
        searchHistory,
    });
});

module.exports = router;
