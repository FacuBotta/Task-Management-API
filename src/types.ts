export enum TaskStatusType {
  done = "done",
  inProgress = "inProgress",
  todo = "todo",
}
export interface TaskType {
  id: number;
  title: string;
  description: string;
  status: TaskStatusType;
  // TODO:  make this a date type when connect to database
  updatedAt: string;
  userId?: number | null;
  parentTaskId?: number | null;
  subTasks?: TaskType[] | [] | null;
  deadline?: string | null;
  completedAt?: string | null;
}

export type newTaskType = Omit<
  TaskType,
  "id" | "createdAt" | "updatedAt" | "subTasks" | "completedAt"
>;
