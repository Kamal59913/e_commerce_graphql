import { Schema, model } from 'mongoose';

export type Otp = {
  email: string,
  otp: string,
  created_at: Date
}

const OtpSchema = new Schema<Otp>({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    expires: 300, //10 minutes
    default: Date.now
  },
 
},
  {
    timestamps: true,
  });


const OtpModel = model('Otp', OtpSchema);

export default OtpModel;
