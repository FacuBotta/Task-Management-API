import { RowDataPacket } from "mysql2";
import db from "../db/connection";
import { newTaskType, TaskType } from "../types";

// const tasks: TaskType[] = tasksData as TaskType[];

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks");
    return tasks as TaskType[];
  } catch (error: any) {
    console.error("Error getting tasks:", error);
    throw new Error(`Error getting tasks: ${error.message}`);
  }
};

export const getTasksByUserId = async (userId: number): Promise<TaskType[]> => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks WHERE userId = ?", [
      userId,
    ]);
    return tasks as TaskType[];
  } catch (error: any) {
    console.error("Error getting tasks by userId:", error);
    throw new Error(`Error getting tasks by userId: ${error.message}`);
  }
};

export const getTaskById = async (id: number): Promise<TaskType | null> => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    const task = rows[0];
    return task as TaskType;
  } catch (error: any) {
    console.error("Error getting task by id:", error);
    throw new Error(`Error getting task by id: ${error.message}`);
  }
};

export const addTask = async (task: newTaskType): Promise<newTaskType> => {
  try {
    const [result] = await db.query(
      "INSERT INTO tasks (title, description, status, userId, parentTaskId, deadline) VALUES (?, ?, ?, ?, ?, ?)",
      [
        task.title,
        task.description,
        task.status,
        task.userId,
        task.parentTaskId,
        task.deadline,
      ]
    );

    const newTask = {
      ...task,
      id: (result as any).insertId,
    };

    return newTask;
  } catch (error: any) {
    console.error("Error adding task:", error);
    throw new Error(`Error adding task: ${error.message}`);
  }
};
