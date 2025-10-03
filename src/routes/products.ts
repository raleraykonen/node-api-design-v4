import { Router } from "express";
import { validation } from "../middlewares/validation.js";
import { ProductSchema } from "../schemas.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";

const router = Router();

router.get("/products", getProducts);

router.get("/products/:id", getProductById);

router.post("/products", validation(ProductSchema), createProduct);

router.put("/products/:id", validation(ProductSchema), updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;