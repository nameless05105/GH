import Joi from "joi";


const username = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required();
const password = Joi.string()

export const signUp = Joi.object().keys({
  username,
  password
});

export const signIn = Joi.object().keys({
  username,
  password
});
