const express = require("express");
const Game = require("../../models/Game");
const router = express.Router();
const User = require("../../models/User");

router.get("/api/cart", async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email });
    const cartItems = user.cart && user.cart.items ? user.cart.items : [];

    if (cartItems.length > 0) {
        const games = await Game.find({ name: { $in: cartItems } });
        res.json({ success: true, games });
    } else {
        res.json({ success: true, games: [] });
    }
});

router.post("/api/cart", async (req, res) => {
    const name = req.body.name;
    const user = await User.findOne({ email: req.session.user.email });
    if (!user.cart.items.includes(name)) {
        user.cart.items.push(name);
        await user.save();
        res.status(201).json({ success: true });
    } else {
        res.status(409).json({
            success: false,
            message: "Item already in cart",
        });
    }
});

router.delete("/api/cart/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const user = await User.findOne({ email: req.session.user.email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        user.cart.items = user.cart.items.filter((item) => item !== name);

        await user.save();

        if (user.cart.items.length === 0) {
            return res.json({
                success: true,
                games: [],
                message: "Your cart is empty",
            });
        }

        res.json({ success: true, games: user.cart.items });
    } catch (error) {
        console.error("Failed to remove item from cart:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error when trying to remove item",
        });
    }
});

module.exports = router;
