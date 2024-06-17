import OtpModel from "@/db/models/otp_model/otp.model";
import userModel from "@/db/models/users_model/users.model";


const VerifyOtpResolver = async (parents: unknown, args, context) => {
  console.log("reached here in verify otp resolver")
  try {
    const { email, otp } = args.input;
    console.log(otp, "got the otp")
    //1: will check if user with  this email exists
    //we do not need to check it from the userModel, because the otp is genereated itslelf only because the user already exists
    //but lets see and verify it later on

    //we need to check if otp exists or not
    let errors = [];

    const userExists = await OtpModel.findOne({email, otp});

    if (!userExists) {
      errors.push({ message: "Otp has expired or is invalid", code: "OTP_EXPIRED" });
    }

    // If there are errors, return them
    if (errors.length > 0) {
      return { success: false, errors };
    }

    const updateUser = await userModel.findOneAndUpdate({email}, {
        is_verified: true
    },
    { new: true, runValidators: true }
  )
  
    return {
      success: true,
      message: 'successfully verified the email' 
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

export default VerifyOtpResolver;
