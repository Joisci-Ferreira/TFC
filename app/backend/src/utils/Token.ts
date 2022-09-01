import * as jwt from 'jsonwebtoken';

type Login = {
  email: string;
  passwordDb: string;
};

export const generate = (paylod: Login): string => {
  const { email, passwordDb: password } = paylod;

  const secret = process.env.JWT_SECRET || 'jwt_secret';

  const jwtConfig: object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email, password }, secret, jwtConfig);

  return token;
};

export const validate = (token: string): jwt.JwtPayload => {
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const decode = jwt.verify(token, secret);

  return decode as jwt.JwtPayload;
};
