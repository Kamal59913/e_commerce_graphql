import OtpModel from "@/db/models/otp_model/otp.model";
import userModel from "@/db/models/users_model/users.model";
import jwtGen from "@/utils/jwtGen";
import EmailSender from "@/utils/services/emailSender";
import { emailVerifyTemplate } from "@/utils/template/emailVerifyTemplateOTP";
import otpGenerator from "otp-generator";
import { generateToken } from "../../jwtGen/jwtGwn";



const addUserResolver = async (parents: unknown, args, context) => {
  console.log("reached here")
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
    

    const otp = otpGenerator.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const newOtp =  new OtpModel({
      otp,
      email,
    })

    await newOtp.save()
    //Is this the plave where I am supposed to generate opt and send it to the email verification


    const token = await generateToken(user);

    console.log(token, "token")
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const url = `${FRONTEND_URL}/otp-verification`;

    const objectToSend = {
      url: url,
      otp: otp
    } 
    
    const template = emailVerifyTemplate(objectToSend);
    const subject = `User verification - OTP`;


    await EmailSender([user.email], template, subject);

    return {
      token: token,
      user: user,
      success: true,
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

export default addUserResolver;
