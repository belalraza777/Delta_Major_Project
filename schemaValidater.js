const Joi = require('joi');

const listingValidater = Joi.object({
    title: Joi.string()
        .trim()
        .max(100)
        .required()
        .messages({
            'string.empty': 'Title is required',
            'string.max': 'Title must be less than or equal to 100 characters',
        }),

    description: Joi.string()
        .allow('', null)
        .required()
        .max(500)
        .messages({
            'string.max': 'Description must be less than or equal to 500 characters',
        }),

    image: Joi.string()
        .uri()
        .allow(''),

    price: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Price must be a number',
            'number.min': 'Price must be a positive number',
        }),

    location: Joi.string()
        .trim()
        .required()
        .max(50),


    country: Joi.string()
        .trim()
        .required()
        .max(50)


});

const reviewValidater = Joi.object({
    comment: Joi.string(), // allow empty string if comment is optional
    rating: Joi.number().min(1).max(5).required(),
    createAt: Joi.date().optional() // usually auto-generated, so optional
});

module.exports = { listingValidater, reviewValidater };
