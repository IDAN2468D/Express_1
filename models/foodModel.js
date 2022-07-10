const mongoose = require("mongoose");
const Joi = require("joi");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    img: String,
    cal: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    Details: Array
});

const FoodModel = mongoose.model("foods", foodSchema);
exports.FoodModel = FoodModel;



exports.validFood = (_bodyData) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(99),
        img: Joi.string().min(2).max(300),
        cal: Joi.number().min(1).max(9999),
        price: Joi.number().min(1).max(9999).required(),
    })

    return joiSchema.validate(_bodyData);
}