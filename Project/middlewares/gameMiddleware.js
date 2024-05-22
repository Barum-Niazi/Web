const Game = require("../models/Game");

module.exports = async function (req, res, next) {
    res.locals.games = await Game.aggregate([{ $sample: { size: 10 } }]);
    res.locals.customersChoice = await Game.aggregate([
        { $sample: { size: 4 } },
    ]);
    next();
};
