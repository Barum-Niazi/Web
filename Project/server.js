const express = require("express");
const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
let expressLayouts = require("express-ejs-layouts");

server.use(expressLayouts);
server.set("layout", "layout");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
    .connect("mongodb://localhost:27017/gamestore")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

server.listen(3000);

server.use(express.static("public"));
server.set("view engine", "ejs");
server.use("/", require("./routes/site/landingpage"));
server.use("/", require("./routes/site/contact-us"));
server.use("/", require("./routes/site/auth"));
