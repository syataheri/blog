const Joi = require('joi');

const schemas = {
    createPost: Joi.object().keys({
        title: Joi.string().required().min(3).max(60)
            .messages({
                "string.base": "Title should be type of string",
                "string.min": "Title should be more than 2 character.",
                "string.max": "Title should be less than 61 character.",
                "any.required": "Title is required."
            }),
        body: Joi.string().required().min(10).max(800)
            .messages({
                "string.base": "Body should be type of string",
                "string.min": "Body should be more than 10 character.",
                "string.max": "Body should be less than 801 character.",
                "any.required": "Body is required."
            })
    }),

    updatePost: Joi.object().keys({
        title: Joi.string().min(3).max(60)
            .messages({
                "string.base": "title should be type of string",
                "string.min": "title should be more than 2 character.",
                "string.max": "title should be less than 61 character.",
            }),
        body: Joi.string().min(10).max(800)
            .messages({
                "string.base": "body should be type of string",
                "string.min": "body should be more than 10 character.",
                "string.max": "body should be less than 801 character.",
            })
    }),
};

module.exports = schemas;