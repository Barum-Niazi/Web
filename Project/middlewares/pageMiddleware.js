module.exports = async function (req, res, next) {
    if (req.url === "/") {
        res.locals.page = "landingpage";
    } else if (req.url === "/contact-us") {
        res.locals.page = "contact-us";
    }
    next();
};
