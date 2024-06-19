import userModel from "../../../db/models/users_model/users.model";

const MEQueryResolver = async (parents: unknown, args, context) => {
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
      user: user,
      errors: null
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
