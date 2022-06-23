const express = require("express");
const { AppliancesModel, validAppliances } = require("../models/appliancesModel");
const router = express.Router();
const cors = require("cors");


router.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"]
}))


router.get("/", async (req, res) => {
    let data = await AppliancesModel.find({});
    res.json(data);
})

router.post("/", async (req, res) => {
    let validBody = validAppliances(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    let shop = new AppliancesModel(req.body);
    await shop.save();
    res.json(shop);
})

router.delete("/:idDel", async (req, res) => {
    try {
        let data = await AppliancesModel.deleteOne({ _id: req.params.idDel });
        res.json(data);
    }
    catch {
        console.log(err);
        res.status(400).send(err)
    }
})

router.put("/:idEdit", async (req, res) => {
    let validBody = validAppliances(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data = await AppliancesModel.updateOne({ _id: req.params.idEdit }, req.body);
        res.json(data);
    }
    catch {
        console.log(err);
        res.status(400).send(err)
    }
})


module.exports = router;