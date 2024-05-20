const express = require("express");
const server = express();
const mongoose = require("mongoose");
const session = require("express-session");
const config = require("config");
let expressLayouts = require("express-ejs-layouts");
const PORT = config.get("port");
const MONGO = config.get("mongoURI");
const SESSIONSECRET = config.get("sessionSecret");
const fetchAndStoreGames = require("./utils/fetchData");

server.use(expressLayouts);
server.set("layout", "layout");
server.use(
    session({ secret: SESSIONSECRET, resave: false, saveUninitialized: true })
);
server.use(require("./middlewares/pageMiddleware"));
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

// fetchAndStoreGames(); data already stored no need for this
server.listen(PORT);

server.use(express.static("public"));
server.set("view engine", "ejs");
server.use("/", require("./routes/site/landingpage"));
server.use("/", require("./routes/site/auth"));
server.use("/", require("./routes/site/contact-us"));
