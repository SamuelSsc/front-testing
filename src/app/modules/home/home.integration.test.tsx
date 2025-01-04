import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import HomePage, { homeStrings } from "./home.page";

describe("Home Page integration tests", () => {
  const roleCheckbox = "checkbox";

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
    const inputValue = "Nova Tarefa";
    render(<HomePage />);

    const input: HTMLInputElement = screen.getByPlaceholderText(
      homeStrings.form.placeholder
    );

    fireEvent.change(input, { target: { value: inputValue } });

    const button = screen.getByText(homeStrings.form.button);

    fireEvent.click(button);

    const element = screen.queryByText(inputValue);
    expect(element).not.toBeNull();
    expect(() => screen.getByText(inputValue)).not.toThrow();
    expect(input.value).toBe("");
  });

  it("should not add a task if input is empty", () => {
    render(<HomePage />);

    const button = screen.getByText(homeStrings.form.button);
    fireEvent.click(button);

    const tasks = screen.queryAllByRole(roleCheckbox);
    expect(tasks).toHaveLength(0);
  });

  it("should not add a task if it already exists in the document", () => {
    const inputValue = "Tarefa Existente";
    render(<HomePage />);

    const input = screen.getByPlaceholderText(homeStrings.form.placeholder);
    fireEvent.change(input, { target: { value: inputValue } });

    const button = screen.getByText(homeStrings.form.button);
    fireEvent.click(button);

    const existingTask = screen.queryByText(inputValue);
    expect(existingTask).not.toBeNull();

    fireEvent.change(input, { target: { value: inputValue } });
    fireEvent.click(button);

    const tasks = screen.queryAllByRole(roleCheckbox);
    expect(tasks).toHaveLength(1);
  });

  it("should toggle the checked state of a task and strike through the text", () => {
    const inputValue = "Tarefa Existente";
    render(<HomePage />);

    const input = screen.getByPlaceholderText(homeStrings.form.placeholder);
    fireEvent.change(input, { target: { value: inputValue } });

    const button = screen.getByText(homeStrings.form.button);
    fireEvent.click(button);

    const tasks = screen.queryAllByRole(roleCheckbox);
    const task = tasks[0];

    expect(task).not.toBeNull();
    fireEvent.click(task);
    expect(task).toHaveProperty("checked", true);
    const taskText = screen.getByText(inputValue);
    expect(taskText).toHaveClass("line-through");
    expect(taskText).toHaveClass("text-gray-500");
  });

  it("should delete a task and remove it from the document", async () => {
    const InputValue = "Tarefa para Deletar";
    render(<HomePage />);

    const input = screen.getByPlaceholderText(homeStrings.form.placeholder);
    fireEvent.change(input, { target: { value: InputValue } });

    const button = screen.getByText(homeStrings.form.button);
    fireEvent.click(button);

    const task = screen.queryByText(InputValue);
    expect(task).not.toBeNull();

    const deleteButton = screen.getByLabelText(
      homeStrings.form.ariaLabelDelete
    );
    fireEvent.click(deleteButton);

    // Usado para fazer com que o código espere um determinado tempo até que a condição interna seja satisfeita sendo trigado repetidas vezes até estourar o timeout.
    await waitFor(() => {
      const removedTask = screen.queryByText(InputValue);
      expect(removedTask).toBeNull();
    });
  });

  it("should show the placeholder and no tasks initially", () => {
    render(<HomePage />);

    const input: HTMLInputElement = screen.getByPlaceholderText(
      homeStrings.form.placeholder
    );
    const tasks = screen.queryAllByRole(roleCheckbox);
    const placeholder = screen.queryByText(homeStrings.noData);

    expect(tasks).toHaveLength(0);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
    expect(placeholder).toBeInTheDocument();
  });
});
