import userModel from "@/db/models/users_model/users.model";

const UpdateUserRoleResolver = async (parent, args, context) => {
  try {
    const { id, role} = args.input;
    
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
    {
        role
    },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
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

export default UpdateUserRoleResolver;
