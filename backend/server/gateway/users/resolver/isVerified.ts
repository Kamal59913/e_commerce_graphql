import userModel from "@/db/models/users_model/users.model";
const isVerified = async (
  parents,
  args,
  context,
) => {
  try {
    console.log(context, "here is the context")
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
    const user = await userModel.findById(context.user._id);
    console.log(user, "here is the user")
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

    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: context.user._id },
      {
        $set: {
            is_verified: true,
        },
      },
      {
        new: true,
      },
    );

    console.log(updatedUser, "here is the updated user")


    return {
      success: true,
      errors: null
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
