const express = require("express");
const Game = require("../../models/Game");
const router = express.Router();
const User = require("../../models/User");
const sessionAuth = require("../../middlewares/sessionAuth");

router.get("/cart", sessionAuth, async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email });
    const cartItems = user.cart && user.cart.items ? user.cart.items : [];

    let games = [];
    if (cartItems.length > 0) {
        games = await Game.find({ name: { $in: cartItems } });
    }

    res.render("cart", { games });
});

module.exports = router;
