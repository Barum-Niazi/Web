module.exports = async function (req, res, next) {
    if (req.url === "/") {
        res.locals.style = "landingpage";
    } else if (req.url === "/store") {
        res.locals.style = "store";
    } else if (req.url === "/contact-us") {
        res.locals.style = "contact-us";
    }

    res.locals.style = "landingpage";

    next();
};
