const indexR = require(".");
const indexS = require("./users");
const shopS = require("./shop");
const foodsR = require("./foods");


exports.routesInit = (app) => {
    app.use("/", indexR)
    app.use("/users", indexS)
    app.use("/shop", shopS)
    app.use("/foods", foodsR)
}