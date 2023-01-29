const mongoose = require("mongoose");
const Joi = require("joi");

const foodSchema = new mongoose.Schema({
    name: { type: String, required: false },
    img: { type: String, require: false },
    cal: { type: Number, required: false },
    price: { type: Number, required: false },
    sqft: { type: Number, required: false },
    bedrooms: { type: Number, required: false },
    Details: { type: Array, required: false }
});

const FoodModel = mongoose.model("foods", foodSchema);
exports.FoodModel = FoodModel;



exports.validFood = (_bodyData) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(99),
        img: Joi.string().min(2).max(300),
        cal: Joi.number().min(1).max(9999),
        price: Joi.number().min(1).max(9999),
    })

    return joiSchema.validate(_bodyData);
}