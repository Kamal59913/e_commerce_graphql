import OtpModel from "@/db/models/otp_model/otp.model";
import userModel from "@/db/models/users_model/users.model";
import EmailSender from "@/utils/services/emailSender";
import { emailVerifyTemplate } from "@/utils/template/emailVerifyTemplateOTP";
import otpGenerator from "otp-generator";
import { generateToken } from "../../../utils/jwtGwn";

const addUserResolver = async (parents: unknown, args, context) => {
  try {
    const { email, fullname } = args.input;

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


    const token = await generateToken(user);
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
      success: true,
      token: token,
      user: user,
      error: null
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
