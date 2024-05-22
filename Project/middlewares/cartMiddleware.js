const Game = require("../models/Game");

module.exports = function (req, res, next) {
    res.locals.cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    next();
};
