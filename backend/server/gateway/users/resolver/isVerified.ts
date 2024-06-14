import userModel from "@/db/models/users_model/users.model";
const isVerified = async (
  parents,
  args,
  context,
) => {
  try {

      console.log(context)
    if (context?.user?.error) {
      return {
        errors: [
          {
            message: 'Unauthorized user',
            code: 'UNAUTHORIZED USER',
          },
        ],
      };
    }

    const user = await userModel.findOne({ _id: context.user.id });

    if (!user) {
      return {
        errors: [
          {
            message: 'User not found',
            code: 'BAD_USER_INPUT',
          },
        ],
      };
    }

    await userModel.findByIdAndUpdate(
      { _id: context.user.id },
      {
        $set: {
            is_verified: true,
        },
      },
      {
        new: true,
      },
    );
    return {
      errors: null,
    };
  } catch (e) {
    console.log(e);
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

export default isVerified;
