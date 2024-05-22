const express = require("express");
const Game = require("../../models/Game");
const router = express.Router();

router.get("/cart", async (req, res) => {
    try {
        const cartItems = res.locals.cart;
        const gamePromises = cartItems.map(async (item) => {
            return await Game.findOne({ name: item });
        });

        const games = await Promise.all(gamePromises);
        const filteredGames = games.filter((game) => game !== null); // Filter out any null values

        res.render("cart", { cart: filteredGames });
    } catch (err) {
        console.error("Error fetching cart items:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
