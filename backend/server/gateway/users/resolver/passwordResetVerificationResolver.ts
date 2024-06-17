import userModel from "@/db/models/users_model/users.model";
import jwtGen from "@/utils/jwtGen";
import EmailSender from "@/utils/services/emailSender";
import { emailVerifyTemplate } from "@/utils/template/emailVerifyTemplateLogin";


const CheckIsUserVerifiedResolver = async (parents: unknown, args, context) => {
  try {
    const { email, fullname } = args.input;
    console.log(email, "here is the email")
    console.log(fullname, "here is the fullname")
    const emailOrEmployeeIdExist = await userModel.findOne({email});

    if (emailOrEmployeeIdExist) {
      return {
        errors: [
          {
            message: "Email already exist ",
            code: "INVALID_EMAIL",
          },
        ],
      };
    }

    const user = await new userModel({
      ...args.input,
    }).save();
    const userID = user._id.toString();
    const hashId = await jwtGen({id:userID}, '1h');

    const FRONTEND_URL = process.env.FRONTEND_URL;
    const url = `${FRONTEND_URL}/password-reset/${hashId}`;
    const template = emailVerifyTemplate(url);
    const subject = `User verify`;

    await EmailSender([user.email], template, subject);

    return {
      success: true,
      user: user,
      message: 'successfully saved the user' 
    }
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

export default CheckIsUserVerifiedResolver;
