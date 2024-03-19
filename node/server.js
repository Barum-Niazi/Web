const express = require("express");
const server = express();

server.listen(3000);

server.use(express.static("public"));
server.set("view engine", "ejs");

server.get("/", (req, res) => {
    res.render("landingpage.ejs");
});
