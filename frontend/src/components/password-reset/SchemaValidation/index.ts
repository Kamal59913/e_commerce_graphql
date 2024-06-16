import * as yup from "yup";

export const schema = yup.object({
    
  new_password: yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .matches(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(/^(?=.*[@$!%*?&])/, "Password must contain at least one special character")
    .min(8, "Password must be at least 8 characters"),

  confirm_password: yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .matches(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(/^(?=.*[@$!%*?&])/, "Password must contain at least one special character")
    .min(8, "Password must be at least 8 characters")
});
