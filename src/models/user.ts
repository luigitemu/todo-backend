import { model, Schema } from "mongoose";

import { User } from "../interfaces";

const UserSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  name: {
    type: String,
    required: [true, "password is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  state: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model<User>("User", UserSchema);
