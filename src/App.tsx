import  { useState } from "react";
import { Button, Card, CardBody,  CardHeader } from "./atomic";
import { BodyPrimary, H1, InputLabel } from "@atomic/atm.typography";


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
      <div className="flex justify-center my-xxl">
      <Card className="w-3/5">
        <CardHeader>
        <H1>To Do List</H1>
        </CardHeader>
        <CardBody>
        <div className="flex flex justify-between items-center">
          <div className="flex flex-col mb-xl">
          <InputLabel>Tarefa</InputLabel>
          {/* toDo: create component input */}
          <input placeholder="descreva sua tarefa" className="border borde" onChange={(e)=> setNewTaskValue(e.target.value)} key={`input-add-new-task-${inputKey}`}/>
          </div>
          <Button onClick={handleAddedNewTask}>Adicionar</Button>
          </div>
          {tasks.map((item)=> (
            <Card className="py-lg my-sm relative">
              <CardBody>
              <div className="flex flex justify-between items-center">
                <BodyPrimary>{item}</BodyPrimary>
                {/* toDo: create component checkbox */}
                <div className="flex flex-col">
                  <input type="checkbox" className="h-md w-md"/>
                </div>
                  <div className="absolute right-md top-xs flex gap-sm mb-md">
                    {/* Edit and delete funtionality */}
                    <button className="bg-[red] w-lg h-lg">E</button>
                    <button className="bg-[green] w-lg h-lg">D</button>
                  </div>
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
