import Joi from "joi";

const OrderSchema = Joi.object({
  address: Joi.string().required(),
  items: Joi.array().items(Joi.object()).required(),
  // amount: Joi.array().items(Joi.object()).required()
});

export default OrderSchema;
