import { newTaskType, TaskStatusType } from "./types";

const isString = (string: any): boolean => {
  if (typeof string === "string" || string instanceof String) {
    return true;
  } else {
    return false;
  }
};
const isNumber = (number: any): boolean => {
  if (typeof number === "number" || number instanceof Number) {
    return true;
  } else {
    return false;
  }
};
const parseTitle = (title: any): string => {
  if (isString(title)) {
    return title;
  } else {
    throw new Error("Title must be a string");
  }
};
const parseDescription = (description: any): string => {
  if (isString(description)) {
    return description;
  } else {
    throw new Error("Description must be a string");
  }
};
const parseStatus = (status: any): TaskStatusType => {
  if (isString(status)) {
    if (Object.values(TaskStatusType).includes(status)) {
      return status;
    } else {
      throw new Error("Status must be one of done, inProgress or todo");
    }
  } else {
    throw new Error("Status must be a string");
  }
};
const parseUserId = (userId: any): number => {
  if (isNumber(userId)) {
    return userId;
  } else {
    throw new Error("id must be a number");
  }
};
const parseDeadline = (deadline: any): string => {
  if (isString(deadline)) {
    return deadline;
  } else {
    throw new Error("Deadline must be a string");
  }
};

// This function serves to convert the request body to a new task object verifying its types from de request body
export default function toNewTaskFromRequest(reqBody: any): newTaskType {
  const newTask: newTaskType = {
    title: parseTitle(reqBody.title),
    description: parseDescription(reqBody.description),
    status: parseStatus(reqBody.status),
    userId: reqBody.userId ? parseUserId(reqBody.userId) : null,
    parentTaskId: reqBody.parentTaskId
      ? parseUserId(reqBody.parentTaskId)
      : null,
    deadline: reqBody.deadline ? parseDeadline(reqBody.deadline) : null,
  };
  return newTask;
}
