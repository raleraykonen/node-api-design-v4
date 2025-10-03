import { Router } from "express";
import { createNewUser, login } from "../controllers/users.js";
import { validation } from "../middlewares/validation.js";
import { NewUserSchema } from "../schemas.js";

const router = Router();

router.post("/users/register", validation(NewUserSchema), createNewUser);

router.post("/users/login", validation(NewUserSchema), login);

export default router;