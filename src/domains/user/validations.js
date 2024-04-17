const Joi = require("joi");
const validator = require("../../validator");

const validations = {
  addUser: validator({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().allow(null, ""),
    }),
  }),
  updateUser: validator({
    body: Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email(),
      password: Joi.string().optional(),
      phone: Joi.string().optional(),
    }),
  }),
};

module.exports = validations;
