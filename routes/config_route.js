const indexR = require(".");
const indexS = require("./users");
const shopS = require("./shop");
const foodsR = require("./foods");
const appliances = require("./appliances");
const upload = require("./upload");

exports.routesInit = (app) => {
    app.use("/", indexR)
    app.use("/users", indexS)
    app.use("/shop", shopS)
    app.use("/foods", foodsR)
    app.use("/appliances", appliances)
    app.use("/upload", upload)
}