import { Router } from "express";
import { check } from "express-validator";

import { login, renew } from "../controllers/auth";
import { validateFields } from "../middlewares/validateFields";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.get("/renew", validateJWT, renew);

export default router;
