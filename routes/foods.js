const express = require("express");
const { FoodModel, validFood } = require("../models/foodModel");
const router = express.Router();
const cors = require("cors");

router.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"]
}))


router.get("/", async (req, res) => {
    let perPage = 5;
    let page = req.query.page ? req.query.page - 1 : 0

    const data = await FoodModel.find({}).limit(perPage).skip(page * perPage);
    res.json(data)
})

router.post("/post", async (req, res) => {
    const validBady = validFood(req.body);
    if (validBady.error) {
        return res.status(400).json(validBady.error.details);
    }
    const food = new FoodModel(req.body);
    await food.save();
    res.json(food);
})


router.delete("/:idDel", async (req, res) => {
    try {
        const data = await FoodModel.deleteOne({ _id: req.params.idDel });
        res.json(data);
    }
    catch {
        console.log(err)
        res.status(400).send(err)
    }
})

router.put("/:idEdit", async (req, res) => {
    const validBady = validFood(req.body);
    if (validBady.error) {
        return res.status(400).json(validBady.error.details);
    }
    try {
        const data = await FoodModel.updateOne({ _id: req.params.idEdit }, req.body);
        res.json(data);
    }
    catch {
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router;