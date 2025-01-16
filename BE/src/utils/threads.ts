import Joi = require('joi');

export const createThreadSchema = Joi.object().keys({
  content: Joi.string().allow(null, ''),
  image: Joi.string(),
});

export const updateThreadSchema = Joi.object().keys({
  content: Joi.string(),
  image: Joi.string(),
});

export const createUserSchema = Joi.object().keys({
  full_name: Joi.string().required(),
  username: Joi.string().required(),
  picture: Joi.string().allow(null, ''),
  description: Joi.string().allow(null, ''),
});

export const updateUserSchema = Joi.object().keys({
  username: Joi.string().allow(null, ''),
  full_name: Joi.string().allow(null, ''),
  description: Joi.string().allow(null, ''),
  picture: Joi.string().allow(null, ''),
});
