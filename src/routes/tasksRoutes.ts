import express from "express";
import * as tasksServices from "../services/tasksServices";
import { newTaskType } from "../types";
import toNewTaskFromRequest from "../utilities";

const router = express.Router();

router.get("/", async (_req, res): Promise<void> => {
  try {
    const tasks = await tasksServices.getTasks();
    res.send(tasks);
  } catch (error: any) {
    console.error("Error in GET /api/tasks:", error);
    res.status(500).send({ error: error.message });
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
  try {
    const tasks = await tasksServices.getTasksByUserId(+req.params.id);
    if (!tasks) {
      res.status(404).send({ error: "Tasks not found" });
      return;
    }
    res.send(tasks);
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
