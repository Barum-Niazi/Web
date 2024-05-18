const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

router.get("/register", (req, res) => {
    res.render("auth/register", { layout: false });
});

router.post("/register", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            console.log("User already exists");
            return res.redirect("/login");
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        user = new User(req.body);

        await user.save();
        console.log("User registered successfully");
        res.redirect("/login");
    } catch (err) {
        console.error("Error during registration:", err);
        res.redirect("/register");
    }
});

router.get("/login", (req, res) => {
    res.render("auth/login", { layout: false });
});

router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found");
            return res.redirect("/register");
        }

        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            console.log("Login successful");
            res.redirect("/");
        } else {
            console.log("Incorrect password");
            res.redirect("/register");
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.redirect("/login");
    }
});

module.exports = router;
