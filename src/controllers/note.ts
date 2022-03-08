import { Request, Response } from "express";

import Note from "../models/notes";

export const postNote = async (req: Request, res: Response) => {
  const { user, todos, title } = req.body;
  const note = new Note({ user, todos, title });
  try {
    await note.save();
  } catch (error) {
    return res.status(500).json({ message: "There was an error on DB" });
  }

  return res.status(200).json({
    note,
  });
};

export const getNoteByUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notes = await Note.find({ user: id });
  return res.json({ notes });
};

export const putNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, ...rest } = req.body;
  try {
    const existNote = await Note.findById(id);
    if (!existNote) {
      res.status(400).json({ message: "There is not a note with this id" });
    }

    const note = await Note.findByIdAndUpdate(id, rest, { new: true });
    return res.status(202).json({ note });
  } catch (error) {
    return res.status(500).json({ message: "There was an error on DB" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    return res.json({ note });
  } catch (error) {
    return res.status(500).json({ message: "There was an error on DB" });
  }
};
