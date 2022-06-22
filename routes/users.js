const express = require("express");
const bcrypt = require("bcrypt");
const { UsersModel, validUser, validLogin } = require("../models/UsersModel");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ msg: "express work perfect 12:36" })
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
    res.json({ msg: "all good need send token" })
})


module.exports = router;