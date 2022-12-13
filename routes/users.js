const express = require("express");
const bcrypt = require("bcrypt");
const { UsersModel, validUser, validLogin, genToken } = require("../models/UsersModel");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    const data = await UsersModel.find({});
    res.json(data)

})

router.get("/userInfo", async (req, res) => {
    let token = req.header("x-api-key");
    if (!token) {
        res.status(401).json({ msg: "you must send token" })
    }
    try {
        let decodeToken = jwt.verify(token, "MONKYSSECRET");
        let user = await UsersModel.findOne({ _id: decodeToken._id }, { pass: 0 });
        res.json(user)
    }
    catch (err) {
        res.status(401).json({ msg: "token invalid or expired 333" })
    }

})

router.post("/", async (req, res) => {
    const validBady = validUser(req.body);
    if (validBady.error) {
        return res.status(400).json(validBady.error.details);
    }
    try {
        const user = new UsersModel(req.body);
        user.pass = await bcrypt.hash(user.pass, 10)
        await user.save();
        user.pass = "*****"
        res.json(user);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ err: "Email alredy in system or there anothe problem " })
    }
})

router.post("/Login", async (req, res) => {
    const validBady = validLogin(req.body);
    if (validBady.error) {
        return res.status(400).json(validBady.error.details);
    }
    const user = await UsersModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ msg: "User not fund" })
    }
    const passValid = await bcrypt.compare(req.body.pass, user.pass);
    if (!passValid) {
        return res.status(400).json({ msg: "Password worng" })
    }
    let newToken = genToken(user._id)
    res.json({ token: newToken })
})


module.exports = router;