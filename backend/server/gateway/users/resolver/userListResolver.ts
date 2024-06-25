import userModel from "@/db/models/users_model/users.model";

const getUserResolver = async (parent, args, context) => {
  try {
      const users = await userModel.find()
      console.log(users)

   return {
    success: true,
    message: "User Added Successfully",
    user: users
   }

  } catch (e) {
    console.log(e);
    return {
      errors: [
        {
          message: 'Something went wrongf',
          code: 'SERVER_ERROR',
        },
      ],
    };
  }
};

export default getUserResolver;
