import { Button, Card, CardBody, CardFooter, CardHeader } from "./atomic";


function App() {
  return (
    <>
      <Button>Button</Button>
      <Button variant="danger">AlertButton</Button>
      <h1>Hello World</h1>
      <div className="flex justify-center">
      <Card className="w-3/5">
        <CardHeader>
          <h1>To Do List</h1>
        </CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
      </div>
    </>
  );
}

export default App;
