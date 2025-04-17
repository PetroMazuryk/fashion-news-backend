import Joi from "joi";
const subscriptionList = ["starter", "pro", "business"];

export const createNewsSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  // email: Joi.string().email().required(),
  number: Joi.string().required(),
  // favorite: Joi.boolean(),
});

export const updateNewsSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  number: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const uptadeFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
