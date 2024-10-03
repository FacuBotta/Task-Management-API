import { RowDataPacket } from "mysql2";
import db from "../db/connection";
import { newTaskType, TaskType } from "../types";

export interface PaginatedTasks {
  tasks: TaskType[];
  total: number;
}

export const getTasks = async (
  page: number,
  limit: number | null
): Promise<PaginatedTasks> => {
  try {
    let query = "SELECT * FROM tasks";
    let values: any[] = [];

    if (limit) {
      const offset = (page - 1) * limit;
      query += " LIMIT ? OFFSET ?";
      values.push(limit, offset);
    }

    // Obtener el total de tareas
    const [totalResult]: any[] = await db.query(
      "SELECT COUNT(*) AS total FROM tasks"
    );
    const total = totalResult[0].total;

    // Obtener las tareas con paginación
    const [tasks] = await db.query(query, values);

    // Retornar las tareas y el total de tareas
    return { tasks: tasks as TaskType[], total };
  } catch (error: any) {
    console.error("Error getting tasks:", error);
    throw new Error(`Error getting tasks: ${error.message}`);
  }
};

export const getTasksByUserId = async (
  userId: number,
  page: number,
  limit: number | null
): Promise<PaginatedTasks> => {
  // Cambia a PaginatedTasks en lugar de PaginatedTasks[]
  try {
    let query = "SELECT * FROM tasks WHERE userId = ?";
    const values: any[] = [userId]; // Inicializa values con el userId

    if (limit) {
      const offset = (page - 1) * limit;
      query += " LIMIT ? OFFSET ?";
      values.push(limit, offset);
    }

    // Obtener las tareas
    const [tasks] = await db.query(query, values); // Usa values directamente

    // Obtener el total de tareas
    const [totalResult]: any[] = await db.query(
      "SELECT COUNT(*) AS total FROM tasks WHERE userId = ?",
      [userId]
    );
    const total = totalResult[0].total;

    // Retornar las tareas y el total
    return { tasks: tasks as TaskType[], total };
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
