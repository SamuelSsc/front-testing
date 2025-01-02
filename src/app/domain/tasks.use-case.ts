import { getTasksFromStorage, saveTasksToStorage } from "@app/data";
import { Task } from "@app/model";
import { useState, useEffect } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    setTasks(storedTasks);
  }, []);

  const addTask = (text: string) => {
    if (!text || tasks.some((task) => task.text === text)) return;
    const newTask = { text, checked: false };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const removeTask = (text: string) => {
    const updatedTasks = tasks.filter((task) => task.text !== text);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const toggleTask = (text: string) => {
    const updatedTasks = tasks.map((task) =>
      task.text === text ? { ...task, checked: !task.checked } : task
    );

    const unchecked = updatedTasks.filter((task) => !task.checked);
    const checked = updatedTasks.filter((task) => task.checked);

    const reorderedTasks = [...unchecked, ...checked];
    setTasks(reorderedTasks);
    saveTasksToStorage(reorderedTasks);
  };

  return {
    tasks,
    addTask,
    removeTask,
    toggleTask,
  };
};
