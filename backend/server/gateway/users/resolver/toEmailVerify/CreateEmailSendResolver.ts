import userModel from "../../../../db/models/users_model/users.model";
import EmailSender from "../../../../utils/services/emailSender"
import { emailVerifyTemplate } from "../../../../utils/template/emailVerifyTemplate";
import { jwtVerify } from "../../authMiddleWare/authMiddleware";
import { generateToken } from "../../jwtGen/jwtGwn";

const CreateEmailSendResolver = async (parent, args, context) => {
  try {
   const {email} = args.input;
    console.log(email)
   /*check if username or email already exists in the database*/
       const errors = [];


   const emailExists = await userModel.findOne({email})

   if(!emailExists) {
    errors.push({ message: "User with this emal does not exist", code: "EMAIL_NOT_EXIST"});
    }
  
   if (errors.length > 0) {
     return { errors };
   }

   const tokenToSent = await generateToken(emailExists)    
   const url = `${process.env.FRONTEND_URL}/password-reset/${tokenToSent}`
   const template = emailVerifyTemplate(url);
   const subject = 'User Verify';

   await EmailSender([emailExists.email], template, subject);

   return {
    success: true,
    message: "User Added Successfully",
    user: emailExists
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
