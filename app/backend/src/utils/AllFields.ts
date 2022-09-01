import * as Joi from 'joi';

const REQUIRED = '400|All fields must be filled';

export default Joi.object({
  email: Joi.string().email().not().empty()
    .required()
    .messages({
      'any.required': REQUIRED,
      'string.empty': REQUIRED,
    }),
  password: Joi.string().not().empty().min(7)
    .required()
    .messages({
      'any.required': REQUIRED,
      'string.empty': REQUIRED,
    }),
});
