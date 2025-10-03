import { ZodObject, infer as zInfer, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";

export const validation = <T extends ZodObject<ZodRawShape>>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }
    req.body = parsed.data as zInfer<T>;
    next();
  }
}