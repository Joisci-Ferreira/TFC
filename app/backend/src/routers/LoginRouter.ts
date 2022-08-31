import { Router } from 'express';
import Users from '../database/models/users';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';

const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);
const loginRouter: Router = Router();

loginRouter.post('/', async (req, res, next) => {
  await loginController.login(req, res, next);
});

export default loginRouter;
