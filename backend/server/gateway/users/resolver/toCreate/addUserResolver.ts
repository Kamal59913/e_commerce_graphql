import userModel from "../../../../db/models/users_model/users.model";
import { validateEmail, validatePassword, validateUsername } from "../../validation/validation";

const addUserResolver = async (parent, args, context) => {
  try {
   const {username, email, password, first_name, last_name, date_of_birth, image, location, 
    phone_number, role, two_factor_enabled, account_status } = args.input;

   /*check if username or email already exists in the database*/
   const errors = [];


   const emailExists = await userModel.findOne({email})
   const usernameExists = await userModel.findOne({username})

   if(emailExists && usernameExists) {
    errors.push({ message: "User Name and email already exists", code: "EMAIL_AND_USERNAME_EXISTS"});
    }
    else if (emailExists) {
        errors.push({ message: "Email already exists", code: "EMAIL_EXISTS" });
      }
    else if (usernameExists) {
        errors.push({ message: "User Name already exists", code: "USERNAME_EXISTS"});
    }

    

   const usernameError = validateUsername(username);
   if (usernameError) errors.push({ message: usernameError, code: "INVALID_USERNAME" });
   
   const emailError = validateEmail(email);
   if (emailError) errors.push({ message: emailError, code: "INVALID_EMAIL" });

  
   if (errors.length > 0) {
     return { errors };
   }

   const newUser = new userModel({
    username,
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    image,
    location,
    phone_number,
    role,
    two_factor_enabled,
    account_status   })

   await newUser.save();


   return {
    success: true,
    message: "User Added Successfully",
    user: newUser
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

export default addUserResolver;
