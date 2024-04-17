const Joi = require("joi");
const validator = require("../../validator");

const validations = {
  authLogin: validator({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
};

module.exports = validations;
