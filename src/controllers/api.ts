import { Application, Request, Response } from "express";

import CoursesData from "../../data/courses.json";

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });
};

export const authUser = (app: Application): void => {
  app.post("/auth", (req: Request, res: Response) => {
    const { email, password } = req.body;
    return res.status(200).json({ email, jwt: password });
  });
};
