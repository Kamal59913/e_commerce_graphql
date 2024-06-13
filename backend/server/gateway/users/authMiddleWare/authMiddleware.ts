import jwt from "jsonwebtoken";

export const jwtVerify = async (token: any) => {
  const SECRET_KEY: any = process.env.TOKEN_SECRET;

  // Log the SECRET_KEY for debugging purposes

  try {
    if (token) {

      // Strip 'Bearer ' prefix if present
      const newToken = token.replace("Bearer ", "");

      // Verify the token
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
