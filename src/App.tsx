import { useState } from "react";
import { Button, Card, CardBody, Colors } from "./atomic";
import { BodyPrimary, H1, InputLabel } from "@atomic/atm.typography";
import { Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTasks } from "@app/domain";

function App() {
  const { tasks, addTask, removeTask, toggleTask } = useTasks();
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [inputKey, setInputKey] = useState(0);

  const handleAddedNewTask = () => {
    addTask(newTaskValue);
    setInputKey((prev) => prev + 1);
    setNewTaskValue("");
  };

  return (
    <>
      <div className="flex justify-center my-xxl">
        <section className="w-2/5">
          <H1 className="text-center">{strings.title}</H1>
          <div className="flex justify-between items-center gap-md">
            <div className="flex flex-col mb-xl w-full">
              <InputLabel>{strings.form.label}</InputLabel>
              {/* toDo: Implementar um atomic para o input usando react hook form  */}
              <input
                placeholder={strings.form.placeholder}
                className="border border-gray-300 p-md rounded"
                onChange={(e) => setNewTaskValue(e.target.value)}
                key={`input-add-new-task-${inputKey}`}
              />
            </div>
            <Button onClick={handleAddedNewTask} rightIcon={<Plus />}>
              {strings.form.button}
            </Button>
          </div>
          <section className="max-h-[calc(100vh-300px)] overflow-y-auto">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.text}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="py-lg my-sm relative">
                    <CardBody>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center justify-center gap-sm">
                          {/* toDo: Implementar um atomic para o checkbox */}
                          <input
                            type="checkbox"
                            className="h-md w-md"
                            checked={task.checked}
                            onChange={() => toggleTask(task.text)}
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
                            onClick={() => removeTask(task.text)}
                          >
                            <Trash2 color={Colors.feedback.error} />
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </section>
        </section>
      </div>
    </>
  );
}

export default App;

const strings = {
  title: "Lista de tarefas!",
  form: {
    label: "Tarefa",
    placeholder: "Descreva sua tarefa",
    button: "Adicionar",
  },
};
