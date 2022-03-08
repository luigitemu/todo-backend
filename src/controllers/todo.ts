import { Router } from "express";

import { getAuthUser } from "./auth";

// export const loadApiEndpoints = (app: Application): void => {
//   app.get("/todo", (req: Request, res: Response) => {
//     return res.status(200).send(CoursesData);
//   });
// };

const router = Router();

router.post("/", getAuthUser);

export default router;
