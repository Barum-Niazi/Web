module.exports = async function (req, res, next) {
    if (req.url === "/contact-us") {
        res.locals.style = "contact-us";
        return next();
    } else res.locals.style = "landingpage";

    next();
};
