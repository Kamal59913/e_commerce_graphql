import userModel from "../../../../db/models/users_model/users.model";
import { validateEmail, validatePassword, validateUsername } from "../../validation/validation";
import { generateToken } from "../../jwtGen/jwtGwn";
import { isPassWordCorrect } from "../../jwtGen/passWordVerify";
import { emailVerifyTemplate } from "@/utils/template/emailVerifyTemplateLogin";
import EmailSender from "@/utils/services/emailSender";

const loginResolver = async (parent, args, context) => {
  try {
    const { email, password} = args.input;
    const user = await userModel.findOne({email})

        const errors = [];

    if (!user) {
      console.log("User not found with email: ", email);
      return {
          errors: [{ message: 'User not found', code: 'USER_NOT_FOUND' }]
      };
    }
    const ispasspordcorrect = await isPassWordCorrect(user.password ,password)

    if (!ispasspordcorrect) {
      console.log("Invalid credentials for email: ", email);
      return {
          errors: [{ message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' }]
      };
  }

    
    const token = await generateToken(user)

    if(user.is_verified == false) {
      console.log("false")
      const FRONTEND_URL = process.env.FRONTEND_URL;
      const url = `${FRONTEND_URL}/email-verification/${token}`;

      const template = emailVerifyTemplate(url);
      const subject = `Login verification`;

      await EmailSender([user.email], template, subject)

      return {  
        errors: [{ message: 'User Not Verified', code: 'NOT_VERIFIED' }]
    };    
  }


    return {
        token: token,
        user: user,
        errors: null,
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

export default loginResolver;
