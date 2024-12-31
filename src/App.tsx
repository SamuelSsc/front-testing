import { useState } from "react";
import { Button, Card, CardBody, Colors } from "./atomic";
import { BodyPrimary, H1, InputLabel } from "@atomic/atm.typography";
import { Trash2 } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState<{ text: string; checked: boolean }[]>([]);
  const [newTaskValue, setNewTaskValue] = useState<string>();
  const [inputKey, setInputKey] = useState<number>(0);

  const handleAddedNewTask = () => {
    if (!newTaskValue || tasks.some((task) => task.text === newTaskValue))
      return;
    const newTask = { text: newTaskValue, checked: false };
    setTasks((prev) => [newTask, ...prev]);
    setInputKey((prev) => prev + 1);
  };

  const handleDeleteTask = (text: string) => {
    setTasks((prev) => prev.filter((task) => task.text !== text));
  };

  const handleCheck = (text: string) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.text === text ? { ...task, checked: !task.checked } : task
      );

      const unchecked = updatedTasks.filter((task) => !task.checked);
      const checked = updatedTasks.filter((task) => task.checked);

      return [...unchecked, ...checked];
    });
  };

  return (
    <>
      <div className="flex justify-center my-xxl">
        <section className="w-2/5">
          <H1 className="text-center">To Do List</H1>
          <div className="flex justify-between items-center">
            <div className="flex flex-col mb-xl">
              <InputLabel>Tarefa</InputLabel>
              <input
                placeholder="Descreva sua tarefa"
                className="border border-gray-300 p-2 rounded"
                onChange={(e) => setNewTaskValue(e.target.value)}
                key={`input-add-new-task-${inputKey}`}
              />
            </div>
            <Button onClick={handleAddedNewTask}>Adicionar</Button>
          </div>
          <section className="max-h-[calc(100vh-300px)] overflow-y-auto">
            {tasks.map((task) => (
              <Card key={task.text} className="py-lg my-sm relative">
                <CardBody>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center justify-center gap-sm">
                      <input
                        type="checkbox"
                        className="h-md w-md"
                        checked={task.checked}
                        onChange={() => handleCheck(task.text)}
                      />
                      <BodyPrimary
                        className={`${
                          task.checked ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.text}
                      </BodyPrimary>
                    </div>
                    <div className="flex flex-row gap-sm">
                      <button
                        className="w-lg h-lg"
                        onClick={() => handleDeleteTask(task.text)}
                      >
                        <Trash2 color={Colors.feedback.error} />
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </section>
        </section>
      </div>
    </>
  );
}

export default App;
