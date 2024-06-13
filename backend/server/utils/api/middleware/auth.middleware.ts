import ApiError from "../responses/apiError";
import asyncHandler from "../responses/asyncHandler";
import jwt, { decode } from "jsonwebtoken"
import userModel from "../../../db/models/users_model/users.model";

export const verifyJWT = asyncHandler(async(req,  _ ,next) => {
    console.log("reached here in token verification")

try {            

            const SECRET_KEY:any = process.env.TOKEN_SECRET;

            const token = req.cookies?.AccessToken || req.header
            ("Authorization")?.replace("Bearer ","")
            console.log(token, "Here have revieved the token")
            if(!token) {
                throw new ApiError(401, "Unauthorized request")
            }
    
            const data: any = jwt.verify(token, SECRET_KEY);
            console.log(data, "verfied")
            const user = await userModel.findById(data?._id).select("-password -refreshToken")

            if(!user) {
                throw new ApiError(401, "Invalid Access Token")
            }

            console.log(user)
            req.user = user;
            next()
            
} catch (error) {
    throw new ApiError(401, error?.message|| "Invalid access token")
}
        //middlewares are used in routes
    }
)