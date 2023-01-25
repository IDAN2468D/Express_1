const express = require("express");
const path = require("path");
const router = express.Router();
const { monkeyUpload } = require("../util/uploadFile");

router.get("/", async (req, res) => {
    res.json({ msg: "upload router" })
})

router.post("/", async (req, res) => {

    try {
        let data = await monkeyUpload(req, "myFile22", "", 3, [".jpg", ".png"]);
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }


    //let myFile = req.files.myFile22;

    // if (myFile.size <= 1024 * 1024 * 2) {
    //     let extss_ar = [".png", ".jpg", ".jpeg", ".gif", ".svg"];
    //     let extFile = path.extname(myFile.name)
    //     if (extss_ar.includes(extFile)) {
    //         myFile.mv("public/" + myFile.name, (err) => {
    //             if (err) {
    //                 return res.status(401).json({
    //                     msg: "err",
    //                     err
    //                 })
    //             }
    //             res.json({ msg: "file upload" })
    //         });
    //     }
    //     else {
    //         res.status(400).json({ msg: "File must be image , jpg, png... " })
    //     }
    // }
    // else {
    //     res.status(400).json({ msg: "File to big, max 2mb!" });
    // }
    // console.log(req.files)
})


module.exports = router;