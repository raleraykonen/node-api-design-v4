import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import prisma from "../services/db.js";

export const createUpdatePoint = async (req: AuthenticatedRequest, res: Response) => {
  const { updateId, name, description } = req.body;
  const user = req.user;

  const update = await prisma.update.findUnique({
    where: {
      id: updateId,
    },
    include: {
      product: true,
    },
  });

  if (!update || update.product.belongsToId !== user?.id) {
    return res.status(404).json({ message: "Update not found" });
  }

  const updatePoint = await prisma.updatePoint.create({
    data: {
      name,
      description,
      updateId,
    },
  });

  return res.status(201).json({ message: "Update Point created", data: updatePoint });
}

export const updateUpdatePoint = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const user = req.user;

  const updatePoint = await prisma.updatePoint.findUnique({
    where: {
      id,
    },
    include: {
      update: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!updatePoint || updatePoint.update.product.belongsToId !== user?.id) {
    return res.status(404).json({ message: "Update Point not found" });
  }

  const updatedUpdatePoint = await prisma.updatePoint.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });

  return res.json({ message: "Update Point updated", data: updatedUpdatePoint });
}
