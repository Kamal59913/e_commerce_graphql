import jwt from "jsonwebtoken";

export const jwtVerify = async (token: any) => {
  const SECRET_KEY: any = process.env.NEXT_PUBLIC_TOKEN_SECRET

  // Log the SECRET_KEY for debugging purposes

  try {
    if (token) {
      console.log(token,"starting")
      const newToken = token.replace("Bearer ", "");
      const data = jwt.verify(newToken, SECRET_KEY);
      return data;
    } else {
      console.log("No token provided");
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    return {
      error: true,
      msg: "Token Invalid",
    };
  }
};
