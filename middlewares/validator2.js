const Joi = require('joi');

const validateTodoPatch = (req, res, next) => {
 const schema = Joi.object({
  completed: Joi.boolean().required(),
 });
};

module.exports = validateTodoPatch;