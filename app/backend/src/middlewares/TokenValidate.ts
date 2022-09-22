import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import IError from '../interfaces/IError';

export default class TokenValidate {
  static async handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const SECRET = process.env.JWT_SECRET || '';

    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }
    try {
      jwt.verify(token, SECRET);

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
