const express = require("express");
const server = express();
const mongoose = require("mongoose");
const session = require("express-session");
const config = require("config");
const cookieParser = require("cookie-parser");
let expressLayouts = require("express-ejs-layouts");

const PORT = config.get("port");
const MONGO = config.get("mongoURI");
const SESSIONSECRET = config.get("sessionSecret");
const fetchAndStoreGames = require("./utils/fetchData");
const sessionAuth = require("./middlewares/sessionAuth");

server.use(express.static("public"));

server.use(expressLayouts);
server.set("view engine", "ejs");
server.set("layout", "layout");

server.use((req, res, next) => {
    console.log(`Request Path: ${req.path}`);
    next();
});

server.use(
    session({
        secret: SESSIONSECRET,
        resave: false,
        saveUninitialized: true,
    })
);

server.use(cookieParser());

server.use(require("./middlewares/styleMiddleware"));
server.use(require("./middlewares/flashMiddleware"));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
    .connect(MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

server.use("/", require("./routes/site/landingpage"));
server.use("/", require("./routes/site/auth"));
server.use("/", require("./routes/api/store"));
server.use("/", require("./routes/site/cart"));
server.use("/", sessionAuth, require("./routes/site/contact-us"));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
