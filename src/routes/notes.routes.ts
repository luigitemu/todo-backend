import { Router } from "express";
import { check } from "express-validator";

import {
  deleteNote,
  getNoteByUser,
  postNote,
  putNote,
} from "../controllers/note";
import { validateJWT } from "../middlewares/validateJWT";
import { validateFields } from "./../middlewares/validateFields";

const router = Router();

router.get("/:id", validateJWT, getNoteByUser);
router.post(
  "/",
  [
    check("user", "user is required").not().isEmpty(),
    check("title", "title is required").not().isEmpty(),
    check("todos", "ToDo are required").isArray(),
    validateFields,
    validateJWT,
  ],
  postNote
);
router.put(
  "/:id",
  [
    check("user", "user is required").not().isEmpty(),
    check("title", "title is required").not().isEmpty(),
    check("todos", "ToDo are required").isArray(),
    validateFields,
    validateJWT,
  ],
  putNote
);

router.delete("/:id", validateJWT, deleteNote);

export default router;
