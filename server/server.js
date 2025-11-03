import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import tasksRouter from "./routes/tasks.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
  })
);

app.get("/api/health", (_, res) => res.json({ ok: true }));
app.use("/api/tasks", tasksRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  });
