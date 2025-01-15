import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Colors,
  BodyPrimary,
  H1,
  InputLabel,
} from "@atomic";
import { Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTasks } from "@app/domain";

function HomePage() {
  const { tasks, addTask, removeTask, toggleTask } = useTasks();
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleAddedNewTask = () => {
    addTask(newTaskValue);
    setNewTaskValue("");
  };

  return (
    <>
      <div className="flex justify-center my-xxl">
        <section className="w-full md:w-2/5 px-md">
          <H1 className="text-center">{homeStrings.title}</H1>
          <div className="flex justify-between items-center gap-md">
            <div className="flex flex-col mb-xl w-full">
              <InputLabel>{homeStrings.form.label}</InputLabel>
              {/* toDo: Implementar um atomic para o input usando react hook form  */}
              <input
                placeholder={homeStrings.form.placeholder}
                className="border border-gray-300 p-md rounded"
                onChange={(e) => setNewTaskValue(e.target.value)}
                value={newTaskValue}
              />
            </div>
            <Button onClick={handleAddedNewTask} rightIcon={<Plus />}>
              {homeStrings.form.button}
            </Button>
          </div>
          <section className="max-h-[calc(100vh-300px)] overflow-y-auto todo-list">
            <AnimatePresence>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <li key={task.text} style={{ listStyle: "none" }}>
                    <motion.div
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
                                  task.checked
                                    ? "line-through text-gray-500"
                                    : ""
                                }`}
                              >
                                {task.text}
                              </BodyPrimary>
                            </div>
                            <div className="flex flex-row gap-sm">
                              <button
                                className="w-lg h-lg"
                                onClick={() => removeTask(task.text)}
                                aria-label={homeStrings.form.ariaLabelDelete}
                              >
                                <Trash2 color={Colors.feedback.error} />
                              </button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  </li>
                ))
              ) : (
                <BodyPrimary className="text-center mt-xl">
                  {homeStrings.noData}
                </BodyPrimary>
              )}
            </AnimatePresence>
          </section>
        </section>
      </div>
    </>
  );
}

export default HomePage;

export const homeStrings = {
  title: "Lista de tarefas!",
  form: {
    label: "Tarefa",
    placeholder: "Descreva sua tarefa",
    button: "Adicionar",
    ariaLabelDelete: "Deletar Tarefa",
  },
  noData: "Nenhuma tarefa adicionada ainda!",
};
