import Joi from "joi";

const subscriptionList = ["starter", "pro", "business"];

export const createNewsSchema = Joi.object({
  title: Joi.string().min(2).max(20).required(),
  date: Joi.date().default(() => new Date()),
  content: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const updateNewsSchema = Joi.object({
  title: Joi.string().min(2).max(20).required(),
  date: Joi.date(),
  content: Joi.string(),
  favorite: Joi.boolean(),
}).min(1)

export const uptadeFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
