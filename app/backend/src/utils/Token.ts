import * as jwt from 'jsonwebtoken';

type Login = {
  email: string;
  passwordDb: string;
};

const generate = (paylod: Login): string => {
  const { email, passwordDb: password } = paylod;

  const secret = process.env.JWT_SECRET || 'jwt_secret';

  const jwtConfig: object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email, password }, secret, jwtConfig);

  return token;
};

export default generate;
