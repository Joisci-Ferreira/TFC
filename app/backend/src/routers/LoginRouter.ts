import { Router } from 'express';
import Users from '../database/models/users';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
import validation from '../middlewares/Validation';
import AllFields from '../utils/AllFields';

const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);
const loginRouter: Router = Router();

loginRouter.post('/', validation(AllFields), async (req, res, next) => {
  await loginController.login(req, res, next);
});

loginRouter.get('/validate', async (req, res, next) => {
  await loginController.validate(req, res, next);
});

export default loginRouter;
