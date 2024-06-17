import userModel from "@/db/models/users_model/users.model";

const updateUserResolver = async (parent, args, context) => {
  try {
    const { id, username, first_name, last_name, phone_number, date_of_birth, email} = args.input;
    
    let users_name: string;
    let users_email: string;
    if(!username || username.trim() == "") {
      const user = await userModel.findById(id);
      users_name = user.username
    } else {
      users_name = username
    }
    if(!email || email.trim() == "") {
      const user = await userModel.findById(id);
      users_email = user.email    
    } else {
      users_email = email
    }
  
    
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { 
        username: users_name,
        email: users_email,
        first_name,
        last_name,
        phone_number,
        date_of_birth
        },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    console.log("User updated:", updatedUser);
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

export default updateUserResolver;
