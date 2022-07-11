const mongoose = require("mongoose");
const Joi = require("joi");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: String,
    cal: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    Details: Array
});

const FoodModel = mongoose.model("foods", foodSchema);
exports.FoodModel = FoodModel;



exports.validFood = (_bodyData) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        img: Joi.string().min(2).max(300),
        cal: Joi.number().min(1).max(9999),
        price: Joi.number().min(1).max(9999),
    })

    return joiSchema.validate(_bodyData);
}