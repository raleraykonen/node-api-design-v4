import { Router } from "express";
import { validation } from "../middlewares/validation.js";
import { CreateUpdateSchema, EditUpdateSchema } from "../schemas.js";
import { createUpdate, deleteUpdate, getUpdateById, getUpdates, updateUpdate } from "../controllers/updates.js";

const router = Router();

router.get("/updates", getUpdates);

router.get("/updates/:id", getUpdateById);

router.post("/updates", validation(CreateUpdateSchema), createUpdate);

router.put("/updates/:id", validation(EditUpdateSchema), updateUpdate);

router.delete("/updates/:id", deleteUpdate);

export default router;