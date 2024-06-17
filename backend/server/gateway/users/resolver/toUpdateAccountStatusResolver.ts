import userModel from "../../../db/models/users_model/users.model";

const UpdateAccountStatusResolver = async (parent, args, context) => {
  try {
    const { id, account_status} = args.input;
    
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        account_status
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

export default UpdateAccountStatusResolver;
