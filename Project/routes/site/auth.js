const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/register", (req, res) => {
    res.render("auth/register", { layout: false });
});

router.post("/register", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            res.flash("danger", "Username already exists");
            return res.redirect("/register");
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        user = new User(req.body);

        await user.save();
        console.log("User registered successfully");
        res.flash("success", "Registration successful. Please log in.");
        res.redirect("/login");
    } catch (err) {
        console.error("Error during registration:", err);
        res.flash("danger", "Registration failed. Please try again.");
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
            res.flash("danger", "Invalid credentials");
            return res.redirect("/login");
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            console.log("Login successful");
            req.session.user = user;
            const payload = { user: { id: user.id, name: user.name } };
            const token = jwt.sign(payload, config.get("jwtSecret"), {
                expiresIn: 3600,
            });

            res.header("x-auth-token", token);
        } else {
            res.flash("danger", "Invalid credentials");
            res.redirect("/login");
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.flash("danger", "Error during login");
        res.redirect("/login");
    }
});

router.get("/logout", (req, res) => {
    req.session.user = null;
    res.flash("success", "Logged out successfully");
    res.redirect("/login");
});

module.exports = router;
