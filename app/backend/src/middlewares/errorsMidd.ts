import { Request, Response, NextFunction } from 'express';
import Errors from './Errors';
import IError from '../interfaces/IError';

export default class ErrorMidd {
  static async validate(
    err: IError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if ((err as IError).code) {
      return res.status((err).code)
        .json({ message: (err).message });
    }

    return res.status(Errors.INTERNAL_SERVER_ERROR).json(
      { message: 'Internal Server Error' },
    );
  }
}
