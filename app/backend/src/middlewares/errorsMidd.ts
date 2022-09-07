import { Request, Response, NextFunction } from 'express';
import Errors from './Errors';
import IError from '../interfaces/IError';

export default class ErrorMidd {
  static async validate(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if ((err as IError).code) {
      return res.status((err as IError).code)
        .json({ message: (err as IError).message });
    }

    return res.status(Errors.INTERNAL_SERVER_ERROR).json(
      { message: 'Internal Server Error' },
    );
  }
}
