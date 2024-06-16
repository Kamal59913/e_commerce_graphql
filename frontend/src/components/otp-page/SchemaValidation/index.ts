import * as yup from 'yup';

export const schema = yup.object({
  otp: yup.string()
    .required('OTP is required')
    .matches(/^\d*$/, 'OTP should be digits only')
    .min(4, 'OTP must be exactly 4 digits')
    .max(4, 'OTP must be exactly 4 digits'),
});
