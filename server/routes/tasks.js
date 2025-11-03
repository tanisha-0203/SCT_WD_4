import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  toggleTask,
  deleteTask
} from "../controllers/taskController.js";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.patch("/:id/toggle", toggleTask);
router.delete("/:id", deleteTask);

export default router;
