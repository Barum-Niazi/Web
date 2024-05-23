module.exports = (req, res, next) => {
    if (req.session.token) {
        res.header("x-auth-token", req.session.token);
    }
    next();
};
