import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import User from "../models/user";

export const postUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = new User({ email, password, name });
  //Validate if email exist
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  //Encrypt pass
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  //save in db
  try {
    await user.save();
  } catch (error) {
    return res.status(500).json({
      message: "There was an error on DB",
    });
  }

  return res.status(200).json({
    user,
  });
};
