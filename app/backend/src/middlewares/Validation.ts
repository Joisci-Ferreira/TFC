import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

const validation = (schema: Joi.Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      return next({
        code: Number(code),
        message,
      });
    }

    return next();
  };

export default validation;
