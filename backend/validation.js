const joi = require("@hapi/joi");

const regValidation = (data) => {
  const schema = joi.object({
    name: joi.string(),
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
  });
  return schema.validate(data);
};

module.exports.regValidation = regValidation;
module.exports.loginValidation = loginValidation;
