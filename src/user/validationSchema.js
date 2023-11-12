const Joi = require('joi');

const schemas = {
    signup: Joi.object().keys({
        name: Joi.string().required().min(2).max(30)
            .messages({ 
                "string.base": "Name should be type of string",
                "string.min": "Name should be more than one character.",
                "string.max": "Name should be less than 31 character.",
                "any.required": "Name is required."
            }),
        email: Joi.string().email().required()
            .messages({
                "string.base": "Email should be type of string",
                "string.email": "Entered email is not valid.",
                "any.required": "Email is required."
            }),
            password: Joi.string().required().min(6).max(12)
            .messages({
                "string.base": "Password should be type of string",
                "string.min": "Password should be more than 6 character.",
                "string.max": "Password should be less than 13 character.",
                "any.required": "Password is required."
            }),
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required()
            .messages({
                "string.base": "Email should be type of string",
                "string.email": "Enter a valid email.",
                "any.required": "Email is required."
            }),
            password: Joi.string().required().min(6).max(12)
            .messages({
                "string.base": "Password should be type of string",
                "string.min": "Password should be more than 6 character.",
                "string.max": "Password should be less than 13 character.",
                "any.required": "Password is required."
            }),
    }),
};

module.exports = schemas;