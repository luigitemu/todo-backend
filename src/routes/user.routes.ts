import { Router } from "express";
import { check } from "express-validator";

import { postUser } from "../controllers/user";
import { validateFields } from "../middlewares/validateFields";
// import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.post(
  "/",
  [
    // validateJWT,
    check("email", "This is not a valid email").isEmail(),
    check("name", "Name is required").not().isEmpty(),
    check(
      "password",
      "password is required and longer than 6 characters"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  postUser
);

export default router;
