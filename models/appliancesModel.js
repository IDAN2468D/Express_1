const mongoose = require('mongoose');
const Joi = require("joi");

const appliancesSchema = new mongoose.Schema({
    title: String,
    name: String,
    model: String,
    image: String,
    price: Number,
    description: String,
    isFavourite: Boolean,
    DiscountPercentages: Number,
    Percentages: Number,
    CatalogNumber: Number,
    imageDetails: Array,
    ColourShown: String,
    Style: String,
    Country: String
})

const AppliancesModel = mongoose.model("appliances", appliancesSchema);

exports.AppliancesModel = AppliancesModel;


exports.validAppliances = (_bodyData) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        model: Joi.string().min(2).max(99).required(),
        image: Joi.string().min(2).max(300),
        price: Joi.number().min(1).max(9999).required(),
        description: Joi.number().min(2).max(99).required(),
    })

    return joiSchema.validate(_bodyData);
}