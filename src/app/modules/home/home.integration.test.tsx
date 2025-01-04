import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import HomePage from "./home.page";

describe("Home Page integration tests", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    // criando um mock dessa propriedade apenas no ambiente de teste. Esse mock é completamente isolado e não afeta o localStorage real do navegador.
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it("should add a new task when the button is clicked and clear the input", () => {
    render(<HomePage />);

    const input: HTMLInputElement = screen.getByPlaceholderText(
      "Descreva sua tarefa"
    );

    fireEvent.change(input, { target: { value: "Nova Tarefa" } });

    const button = screen.getByText("Adicionar");

    fireEvent.click(button);

    const element = screen.queryByText("Nova Tarefa");
    expect(element).not.toBeNull();
    expect(() => screen.getByText("Nova Tarefa")).not.toThrow();
    expect(input.value).toBe("");
  });

  it("should not add a task if input is empty", () => {
    render(<HomePage />);

    const button = screen.getByText("Adicionar");
    fireEvent.click(button);

    const tasks = screen.queryAllByRole("checkbox");
    expect(tasks).toHaveLength(0);
  });

  it("should not add a task if it already exists in the document", () => {
    render(<HomePage />);

    const input = screen.getByPlaceholderText("Descreva sua tarefa");
    fireEvent.change(input, { target: { value: "Tarefa Existente" } });

    const button = screen.getByText("Adicionar");
    fireEvent.click(button);

    const existingTask = screen.queryByText("Tarefa Existente");
    expect(existingTask).not.toBeNull();

    fireEvent.change(input, { target: { value: "Tarefa Existente" } });
    fireEvent.click(button);

    const tasks = screen.queryAllByRole("checkbox");
    expect(tasks).toHaveLength(1);
  });

  it("should toggle the checked state of a task and strike through the text", () => {
    render(<HomePage />);
    const input = screen.getByPlaceholderText("Descreva sua tarefa");
    fireEvent.change(input, { target: { value: "Tarefa Existente" } });

    const button = screen.getByText("Adicionar");
    fireEvent.click(button);

    const tasks = screen.queryAllByRole("checkbox");
    const task = tasks[0];

    expect(task).not.toBeNull();
    fireEvent.click(task);
    expect(task).toHaveProperty("checked", true);
    const taskText = screen.getByText("Tarefa Existente");
    expect(taskText).toHaveClass("line-through");
    expect(taskText).toHaveClass("text-gray-500");
  });

  it("should delete a task and remove it from the document", async () => {
    render(<HomePage />);

    const input = screen.getByPlaceholderText("Descreva sua tarefa");
    fireEvent.change(input, { target: { value: "Tarefa para Deletar" } });

    const button = screen.getByText("Adicionar");
    fireEvent.click(button);

    const task = screen.queryByText("Tarefa para Deletar");
    expect(task).not.toBeNull();

    const deleteButton = screen.getByLabelText("Deletar Tarefa");
    fireEvent.click(deleteButton);

    // Usado para fazer com que o código espere um determinado tempo até que a condição interna seja satisfeita sendo trigado repetidas vezes até estourar o timeout.
    await waitFor(() => {
      const removedTask = screen.queryByText("Tarefa para Deletar");
      expect(removedTask).toBeNull();
    });
  });

  it("should show the placeholder and no tasks initially", () => {
    render(<HomePage />);

    const input: HTMLInputElement = screen.getByPlaceholderText(
      "Descreva sua tarefa"
    );
    const tasks = screen.queryAllByRole("checkbox");
    const placeholder = screen.queryByText("Nenhuma tarefa adicionada ainda!");

    expect(tasks).toHaveLength(0);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
    expect(placeholder).toBeInTheDocument();
  });
});
