import express from "express";
import * as tasksServices from "../services/tasksServices";
import { newTaskType } from "../types";
import toNewTaskFromRequest from "../utilities";

const router = express.Router();

router.get("/", async (req, res): Promise<void> => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number | null = req.query.limit
    ? parseInt(req.query.limit as string)
    : null;

  if (page < 1 || (limit && limit < 1)) {
    res.status(400).send("Page and limit must be greater than 0");
    return;
  }

  try {
    const { tasks, total } = await tasksServices.getTasks(page, limit);
    res.send({ tasks, total, page, limit });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
router.post("/", async (req, res): Promise<void> => {
  try {
    const newTask: newTaskType = toNewTaskFromRequest(req.body);
    const task = await tasksServices.addTask(newTask);
    res.send(task);
  } catch (error: any) {
    console.error("Error in POST /api/tasks:", error);
    res.status(400).send({ error: error.message });
  }
});
router.get("/user/:id", async (req, res): Promise<void> => {
  const userId: number = +req.params.id;

  if (isNaN(userId)) {
    res.status(400).send("Invalid user ID");
    return;
  }

  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number | null = req.query.limit
    ? parseInt(req.query.limit as string)
    : null;

  if (page < 1 || (limit && limit < 1)) {
    res.status(400).send("Page and limit must be greater than 0");
    return;
  }

  try {
    const { tasks, total } = await tasksServices.getTasksByUserId(
      userId,
      page,
      limit
    );
    if (tasks.length === 0) {
      res.status(404).send({ error: "No tasks found for this user" });
      return;
    }
    res.send({ tasks, total, page, limit });
  } catch (error: any) {
    console.error("Error in GET /api/tasks/user/:id:", error);
    res.status(500).send({ error: error.message });
  }
});
router.get("/:id", async (req, res): Promise<void> => {
  try {
    //NOTE: el + lo transforma en number "aria operator"
    const task = await tasksServices.getTaskById(+req.params.id);
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

export default router;
