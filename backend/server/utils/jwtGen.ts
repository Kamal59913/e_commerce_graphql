import jwt from 'jsonwebtoken';

const jwtGen = (value: any, expiresIn?: string) => {
  const SECRET: any = process.env.JWT_TOKEN_SECRET;
  const options = expiresIn ? { expiresIn } : {}; // Conditionally set expiration if provided
  return jwt.sign(value, SECRET, options);
};

export default jwtGen;