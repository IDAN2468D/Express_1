const express = require("express");
const { prods_ar } = require("../data/shopData");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ prods_ar })
})
// ? category?shop/category=food
router.get("/category", (req, res) => {
    const categoryQ = req.query.category;
    const temp_ar = prods_ar.filter(item => {
        return item.cat == categoryQ;
    })
    res.json(temp_ar)
})
//shop/category=food
router.get("/category2/:catName", (req, res) => {
    const categoryQ = req.params.catName;
    const temp_ar = prods_ar.filter(item => {
        return item.cat == categoryQ;
    })
    res.json(temp_ar)
})


module.exports = router;