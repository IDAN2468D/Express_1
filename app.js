const express = require("express");
const path = require("path");
const http = require("http");
const fileupload = require("express-fileupload");
require("./db/mongoConnect");

const { routesInit } = require("./routes/config_route")

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload({
    limits: { fileupload: 1024 * 1024 * 5 }
}))

routesInit(app);

const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port);