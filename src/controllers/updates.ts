import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import prisma from "../services/db.js";

export const getUpdates = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const products = await prisma.product.findMany({
    where: {
      belongsToId: user?.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.flatMap(product => product.updates);
  
  return res.status(200).json({ message: "Updates retrieved", data: updates });
}

export const getUpdateById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  const update = await prisma.update.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });

  if (!update || update.product.belongsToId !== user?.id) {
    return res.status(404).json({ message: "Update not found" });
  }

  return res.status(200).json({ message: "Update retrieved", data: update });
}

export const createUpdate = async (req: AuthenticatedRequest, res: Response) => {
  const { productId, title, body, status, version } = req.body;
  const user = req.user;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product || product.belongsToId !== user?.id) {
    return res.status(404).json({ message: "Product not found" });
  }

  const update = await prisma.update.create({
    data: {
      title,
      body,
      status,
      version,
      productId: productId,
    },
  });

  return res.status(201).json({ message: "Update created", data: update });
}

export const updateUpdate = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, body, status, version } = req.body;
  const user = req.user;

  const update = await prisma.update.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });

  if (!update || update.product.belongsToId !== user?.id) {
    return res.status(404).json({ message: "Update not found" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      status,
      version,
    },
  });

  return res.status(200).json({ message: "Update updated", data: updatedUpdate });
}

export const deleteUpdate = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  const update = await prisma.update.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });

  if (!update || update.product.belongsToId !== user?.id) {
    return res.status(404).json({ message: "Update not found" });
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ message: "Update deleted", data:  deletedUpdate});
}