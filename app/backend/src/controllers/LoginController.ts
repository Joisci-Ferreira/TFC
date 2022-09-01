import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';
import { generate } from '../utils/Token';
import IError from '../interfaces/IError';
import IUser from '../interfaces/IUser';

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
    try {
      const { email, password: passwordDb } = req.body;
      const result = await this.loginService.login({ email, passwordDb });

      if ((result as IError).code) {
        return next(result);
      }

      const token = await generate({ email, passwordDb });
      return res.status(200).json({ user: result, token });
    } catch (err) {
      return next(err);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;

      if (token) {
        const JwtPayload = await LoginService.validate(token);
        const { email, password } = JwtPayload;
        const user = await this.loginService.getLogin({ email, password });
        const { role } = user as IUser;
        return res.status(200).json({ role });
      }
    } catch (err) {
      return next(err);
    }
  }
}
