module.exports = async function (req, res, next) {
    if (!req.session.user) {
        res.flash("error", "You must be logged in to perform this action");
        return res.redirect("/login");
    }
    next();
};
