import jwt from "jsonwebtoken";


export const generateToken =  async (user) => {

    return jwt.sign({
        _id:user._id,
        username: user.username,
        email: user.email,
        two_factor_enabled: user.two_factor_enabled,
        account_status: user.account_status,
        role: user.role
    },

    process.env.JWT_TOKEN_SECRET,

    {
        expiresIn: process.env.TOKEN_EXPIRY
    }
)
}