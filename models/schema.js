const Joi = require("joi");

const addContactSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(5).max(30).required(),
  phone: Joi.string().min(8).max(15).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().min(5).max(30),
  phone: Joi.string().min(8).max(15),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
};
