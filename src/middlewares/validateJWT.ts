/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { generateJWT } from "../helpers/generateJWT";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      message: "token is required",
    });
  }

  try {
    const { uid } = <any>jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
    const newToken = await generateJWT(uid);
    res.setHeader("x-token", newToken);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "token is invalid",
    });
  }
};
