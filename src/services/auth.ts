import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserModel } from "../generated/prisma/models.js";

export const createJWT = (user: UserModel) => {  
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};