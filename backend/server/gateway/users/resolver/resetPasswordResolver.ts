import bcrypt from "bcrypt";
import userModel from "@/db/models/users_model/users.model";

const resetPasswordResolver = async (parents: unknown, args, context) => {
  const { new_password, confirm_password } = args.input;

  try {
    if (context?.user?.error) {
      return {
        errors: [
          {
            message: "Unauthorized user",
            code: "UNAUTHORIZED_USER",
          },
        ],
      };
    }

    const user = await userModel.findById(context.user._id);
    console.log(user, "here is the user");
    if (!user) {
      return {
        errors: [
          {
            message: "User not found",
            code: "BAD_USER_INPUT",
          },
        ],
      };
    }

    if (new_password !== confirm_password) {
      return {
        errors: [
          {
            message: "Passwords do not match",
            code: "PASSWORD_NOT_MATCH",
          },
        ],
      };
    }

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(new_password, 10);

    const updatedUser = await userModel.findByIdAndUpdate(
      context.user._id,
      {
        $set: {
          password: hashedPassword,
        },
      },
      {
        new: true,
      }
    );

    return {
      success: true,
      errors: null,
    };
  } catch (e) {
    console.log(e);
    return {
      errors: [
        {
          message: "Something went wrong",
          code: "SERVER_ERROR",
        },
      ],
    };
  }
};

export default resetPasswordResolver;
