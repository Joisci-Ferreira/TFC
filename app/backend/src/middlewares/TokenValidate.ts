/* import { Request, Response, NextFunction } from 'express';
// import IError from '../interfaces/IError';
import { validate } from '../utils/Token';

export default class TokenValidate {
  static async handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }

    if (validate(token)) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return next();
  }
} */
