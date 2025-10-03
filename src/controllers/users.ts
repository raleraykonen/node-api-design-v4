import { NextFunction, Request, Response } from "express";
import prisma from "../services/db.js";
import { comparePasswords, createJWT, hashPassword } from "../services/auth.js";

export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
  const hash = await hashPassword(req.body.password);
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const login = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};