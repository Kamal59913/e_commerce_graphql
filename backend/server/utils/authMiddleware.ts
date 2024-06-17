import jwt from "jsonwebtoken";

export const jwtVerify = async (token: any) => {
  const SECRET_KEY:any = process.env.JWT_TOKEN_SECRET;
  try {
    if (token) {
      const newToken = token.replace("Bearer ","")
      const data: any = jwt.verify(newToken, SECRET_KEY);
      return data;
    }
  } catch (err) {
    return {
      error: true,
      msg: "Token Invalid",
    };
  }
};
