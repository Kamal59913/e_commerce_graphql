import userModel from "../../../db/models/users_model/users.model";

const MEQueryResolver = async (parents: unknown, args, context) => {
  console.log("reached here in my query resolver", context)
  try {
    if (context.user.error) {
      return {
        errors: [
          {
            message: 'Unauthorized user',
            code: 'UNAUTHORIZED USER',
          },
        ],
      };
    }
    const id = context.user._id;
    if (!id) return;
    const user = await userModel.findOne({ _id: id });
    return {
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      two_factor_enabled: user.two_factor_enabled,
      account_status: user.account_status,
      role: user.role,
      is_verified: user.is_verified
    };

  } catch (e) {
    console.log("error occured")
    return {
      errors: [
        {
          message: 'Something went wrong',
          code: 'SERVER_ERROR',
        },
      ],
    };
  }
};

export default MEQueryResolver;
