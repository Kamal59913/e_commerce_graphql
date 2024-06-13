import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";

export type user = {
  /*12*/
  first_name: string,
  last_name: string,
  username: string,
  image: string,
  email: string,
  date_of_birth: string,
  password: string,
  location: {
    country: string,
    state: string,
    city: string,
    postal_code: string,
    coordinates: string
  },
  two_factor_enabled: boolean,
  account_status: 'active' | 'inactive' | 'banned' ,
  role: 'User' | 'Admin' ,
  phone_number: {
    prefix: string,
    digits: string
  },
}

const userSchema = new Schema<user>({
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
  },

  date_of_birth: {
    type: String,
    required:false
  },

  password: {
      type: String,
      required: true
  },
  
  location: {
      country: { type: String, required: false},
      state: { type: String, required: false},
      city: { type: String, required: false},
      postal_code: { type: String, required: false},
      coordinates: { type: String, required: false},
  },
  two_factor_enabled: {
    type: Boolean,
    required: false,
    default: false
  },
  account_status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  role: {
    type: String,
    required: false,
    enum: ['User', 'Admin'],
    default: 'User'
  },
  phone_number: {
    prefix: {type: String, required: false},
    digits: {type: String, required: false}
    }
  },
  {
    timestamps: true,
  });

  userSchema.pre("save", async function (next) { /*Arrow function do not have this keyword for the context*/
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const userModel = model('User', userSchema);

export default userModel;
