import Joi, { object } from "joi";

export const cardBody = object({
  ticketId: Joi.number().required(),
});
