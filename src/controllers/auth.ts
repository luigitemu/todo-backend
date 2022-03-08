/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { generateJWT } from "../helpers/generateJWT";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // validate if email exist;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email / Password are not valid",
      });
    }
    // validate if user is active;
    if (!user.state) {
      return res.status(400).json({
        message: "Email / Password are not valid",
      });
    }
    // validate password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Email / Password are not valid",
      });
    }

    // generate JWT;
    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

export const renew = async (req: Request, res: Response) => {
  const token = req.header("x-token");
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { uid } = <any>jwt.verify(token!, process.env.SECRETORPRIVATEKEY!);
    const newToken = await generateJWT(uid);
    const user = await User.findById(uid);
    return res.json({ user, token: newToken });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};
