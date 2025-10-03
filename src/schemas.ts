import * as z from "zod";

export const NewUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const UpdateUserSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
});

export const CreateUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  body: z.string().min(1, "Body is required"),
  version: z.string().optional(),
  productId: z.string().min(1, "Product ID is required"),
});

export const EditUpdateSchema = z.object({
  title: z.string().max(255, "Title is too long").optional(),
  body: z.string().optional(),
  status: z.enum(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"]).optional(),
  version: z.string().optional(),
});

export const NewUpdatePointSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  description: z.string().min(1, "Description is required"),
  updateId: z.string().min(1, "Update ID is required"),
});

export const EditUpdatePointSchema = z.object({
  name: z.string().max(255, "Name is too long").optional(),
  description: z.string().optional(),
});