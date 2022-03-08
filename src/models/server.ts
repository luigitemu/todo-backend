/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from "cors";
import express, { Application } from "express";
import path from "path";

import { dbConnection } from "../database/config";
import authRouter from "../routes/auth.routes";
import noteRouter from "../routes/notes.routes";
import userRouter from "../routes/user.routes";

export default class Server {
  app: Application;
  port: string | number;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    // connect DB
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
    );
  }

  routes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/note", noteRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor corriendo en ${this.port}`);
    });
  }
}
