const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.flash("danger", "JWT Token auth failed");
        return res.redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.flash("danger", +err.message);
    }
};
