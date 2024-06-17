import userModel from "@/db/models/users_model/users.model";
import EmailSender from "@/utils/services/emailSender";
import { emailVerifyTemplate } from "@/utils/template/emailVerifyTemplatePasswordReset";
import { jwtVerify } from "../../../utils/authMiddleware";
import { generateToken } from "../../../utils/jwtGwn";

const CreateEmailSendResolver = async (parent, args, context) => {
  try {
   const {email} = args.input;
    console.log(email)
   /*check if username or email already exists in the database*/

   const emailExists = await userModel.findOne({email})

   if(!emailExists) {
    return {
      errors: [{ success: false, message: 'Email does not exists', code: 'EMAIL_NOT_EXIST' }]
  };    
}
  
   const tokenToSent = await generateToken(emailExists)    
   console.log(tokenToSent)
   const url = `${process.env.FRONTEND_URL}/password-reset/${tokenToSent}`
   console.log(url)
   const template = emailVerifyTemplate(url);
   const subject = 'User Verify';

   await EmailSender([emailExists.email], template, subject);

   return {
    success: true,
    message: "User Added Successfully",
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

export default CreateEmailSendResolver;
