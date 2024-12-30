import  { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "./atomic";


function App() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTaskValue, setNewTaskValue] = useState<string>()
  const [inputKey, setInputKey] = useState<number>(0)

  const handleAddedNewTask = () => {
    setTasks((prev)=> newTaskValue ? [...prev, newTaskValue]: [...prev])
    setInputKey((prev)=> prev+1)
  }

  return (
    <>
      <Button variant="danger">AlertButton</Button>
      <h1>Hello World</h1>
      <div className="flex justify-center">
      <Card className="w-3/5">
        {/* <CardHeader>
        <h1>To Do List</h1>
        </CardHeader> */}
        <CardBody>
        <div className="flex flex justify-between items-center">
          <div className="flex flex-col mb-xl">
          <label className="mb-xs">Tarefa</label>
          <input placeholder="descreva sua tarefa" className="border borde" onChange={(e)=> setNewTaskValue(e.target.value)} key={`input-add-new-task-${inputKey}`}/>
          </div>
          <Button onClick={handleAddedNewTask}>Adicionar</Button>
          </div>
          {tasks.map((item)=> (
            <Card className="py-lg my-sm">
              <CardBody>
              <div className="flex flex justify-between items-center">
                {item}
                <input type="checkbox" className="h-md w-md"/>
              </div>
              </CardBody>
            </Card>
          ))}
        </CardBody>
        {/* <CardFooter>Footer</CardFooter> */}
      </Card>
      </div>
    </>
  );
}

export default App;
