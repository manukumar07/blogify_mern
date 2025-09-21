const Joi = require("joi");

const postSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    category: Joi.string().min(2).max(50).required(),
    slug: Joi.string().min(3).max(100).required(),
    summary: Joi.string().max(300).optional(),
    image: Joi.string().uri().optional(),
    description: Joi.string().max(1000).optional(),

});

module.exports = postSchema;
