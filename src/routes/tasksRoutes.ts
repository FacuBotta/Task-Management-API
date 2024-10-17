import express from "express";
import * as tasksServices from "../services/tasksServices";
import { newTaskType } from "../types";
import toNewTaskFromRequest from "../utilities";

const router = express.Router();
// Get all tasks of authenticated user ==========================================================================
router.get("/", async (req, res): Promise<void> => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number | null = req.query.limit
    ? parseInt(req.query.limit as string)
    : null;

  if (page < 1 || (limit && limit < 1)) {
    res.status(400).send("Page and limit must be greater than 0");
    return;
  }
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const { tasks, total } = await tasksServices.getTasksByUserId(
      userId,
      page,
      limit
    );
    res.send({ tasks, total, page, limit });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
// Add a new task ==========================================================================
router.post("/", async (req, res): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const newTask: newTaskType = toNewTaskFromRequest(
      userId as number,
      req.body
    );
    const task = await tasksServices.addTask(newTask);
    res.send(task);
  } catch (error: any) {
    console.error("Error in POST /api/tasks:", error);
    res.status(400).send({ error: error.message });
  }
});
// Get task by ID ==========================================================================
router.get("/:id", async (req, res): Promise<void> => {
  try {
    const userId = req.user?.userId;
    //NOTE: el + lo transforma en number "aria operator"
    const task = await tasksServices.getTaskById(
      userId as number,
      +req.params.id
    );
    if (!task) {
      res.status(404).send({ error: "Task not found" });
      return;
    }
    res.send(task);
  } catch (error: any) {
    console.error("Error in GET /api/tasks/:id:", error);
    res.status(500).send({ error: error.message });
  }
});
// TODO: add update and delete tasks endpoints

export default router;
