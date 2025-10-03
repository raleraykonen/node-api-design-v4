import process from "process";
import express from "express";
import morgan from "morgan";
import { protect } from "./middlewares/auth.js";
import productsRouter from "./routes/products.js";
import updatesRouter from "./routes/updates.js";
import updatePointsRouter from "./routes/updatePoints.js";
import usersRouter from "./routes/users.js";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if(process.env.NODE_ENV === 'development') process.loadEnvFile();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use("/api", usersRouter);
app.use("/api", protect, productsRouter);
app.use("/api", protect, updatesRouter);
app.use("/api", protect, updatePointsRouter);

app.use((err, require, res, next) => {
  if(err.type === "auth") {
    return res.status(401).json({ message: "Unauthorized" });
  } else if(err.type === "input") {
    return res.status(400).json({ message: "Bad Request" });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal Server Error" });
})

export default app;