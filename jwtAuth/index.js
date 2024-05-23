const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const secretkey = "secret key";

app.get("/test", (req, res) => {
    const payload = {
        username: "testuser",
    };
    const token = jwt.sign(payload, secretkey, { expiresIn: "1h" });
    res.setHeader("Authorization", `${token}`);
    res.json({ message: "Token generated" });
});

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }
    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Failed to authenticate token" });
        }
        req.user = decoded;
        next();
    });
}

app.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
