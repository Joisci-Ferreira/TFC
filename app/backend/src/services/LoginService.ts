import * as Bcryptjs from 'bcryptjs';
import Users from '../database/models/users';
import IError from '../interfaces/IError';
import IUser from '../interfaces/IUser';

type Login = {
  email: string;
  passwordDb: string;
};

export interface ILoginService {
  usersModel: typeof Users;
  login(data: Login): Promise<IUser | IError>;
}

export default class LoginService implements ILoginService {
  public usersModel: typeof Users;

  constructor(usersModel: typeof Users) {
    this.usersModel = usersModel;
  }

  async login(data: Login): Promise<IUser | IError> {
    const { email, passwordDb } = data;
    const result = await this.usersModel.findOne({
      where: {
        email,
      },
    });
    if (!result) {
      return { code: 401, message: 'Incorrect email or password' } as IError;
    }

    const { id, username, role, password } = result as Users;
    const validated = await LoginService.validatePassword(passwordDb, password);

    if (!validated) {
      return { code: 401, message: 'Incorrect email or password' } as IError;
    }

    const user = { id, username, role, email };
    return user;
  }

  static async validatePassword(passwordDb: string, password: string): Promise<boolean> {
    const validatePass = await Bcryptjs.compare(passwordDb, password);
    return validatePass;
  }
}
