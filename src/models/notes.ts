import { model, Schema } from "mongoose";

import { Note } from "./../interfaces/index";

const NoteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: [true, "title is required."],
    },
    todos: [
      {
        name: { type: String, trim: true },
        isDone: { type: Boolean, required: true, default: false },
      },
    ],
  },
  { versionKey: false }
);

export default model<Note>("Notes", NoteSchema);
