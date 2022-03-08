import mongoose from "mongoose";

export interface User {
  email: string;
  name: string;
  password: string;
  state: boolean;
}

export interface ToDo {
  name: string;
  isDone: boolean;
}

export interface Note {
  user: mongoose.Types.ObjectId;
  title: string;
  todos: Array<ToDo>;
}
