import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import newsRouter from "./routes/newsRouter.js";
import authRouter from "./routes/authRouter.js";

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/news", newsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
