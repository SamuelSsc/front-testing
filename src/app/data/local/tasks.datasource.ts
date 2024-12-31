import { Task } from "@app/model";

const TASKS_KEY = "tasks";

export const getTasksFromStorage = (): Task[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
