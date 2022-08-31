import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';
import generate from '../utils/Token';
import IError from '../interfaces/IError';

export interface ILoginController {
  loginService: LoginService;
  login(req: Request, res: Response, next: NextFunction): void;
  validate(req: Request, res: Response, next: NextFunction): void;
}

export default class LoginController {
  public loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password: passwordDb } = req.body;
    const result = await this.loginService.login({ email, passwordDb });

    if ((result as IError).code) {
      return next(result);
    }

    const token = await generate({ email, passwordDb });
    return res.status(200).json({ user: result, token });
  }
}
