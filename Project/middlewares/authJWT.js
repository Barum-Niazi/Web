const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log("Token from header:", token);
    if (!token) {
        res.flash(
            "danger",
            "JWT Token auth failed, Please sign in to view this page."
        );
        return res.redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.flash("danger", "Invalid token, please login again.");
        return res.redirect("/login");
    }
};
