const Game = require("../models/Game");

module.exports = async function (req, res, next) {
    res.locals.games = await Game.aggregate([{ $sample: { size: 5 } }]);
    next();
};
