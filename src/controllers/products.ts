import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import prisma from "../services/db.js";

export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const products = await prisma.product.findMany({
    where: {
      belongsToId: user?.id,
    },
  });
  return res.status(200).json({ data: products });
};

export const getProductById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {id, belongsToId: user?.id}
    }
  });

  return res.status(200).json({ data: product });
}

export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
  const { name } = req.body;
  const user = req.user;

  const product = await prisma.product.create({
    data: {
      name,
      belongsToId: user?.id,
    },
  });

  return res.status(201).json({ message: "Product created", data: product});
};

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = req.user;

  const product = await prisma.product.update({
    where: {
      id_belongsToId: {id, belongsToId: user?.id}
    },
    data: {
      name,
    },
  });

  return res.status(200).json({ message: "Product updated", data: product });
}

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
  const {id} = req.params;
  const user = req.user;
  
  const product = await prisma.product.delete({
    where: {
      id_belongsToId: {id, belongsToId: user?.id}
    },
  });

  return res.status(200).json({ message: "Product deleted", data: product });
}