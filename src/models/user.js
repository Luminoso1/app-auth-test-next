import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username can't be blank"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email can't be blank"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password can't be blank"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    fortotPasswordToken: String,
    fortotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    timestapms: true,
  }
);

const User = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;
