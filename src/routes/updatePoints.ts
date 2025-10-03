import { Router } from "express";
import { createUpdatePoint, updateUpdatePoint } from "../controllers/updatePoints.js";
import { validation } from "../middlewares/validation.js";
import { EditUpdatePointSchema, NewUpdatePointSchema } from "../schemas.js";

const router = Router();

router.get("/updatepoints", (req, res) => {});

router.get("/updatepoints/:id", (req, res) => {});

router.post("/updatepoints", validation(NewUpdatePointSchema), createUpdatePoint);

router.put("/updatepoints/:id", validation(EditUpdatePointSchema), updateUpdatePoint);

router.delete("/updatepoints/:id", (req, res) => {});

export default router;