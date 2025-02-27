import * as data from "@app/data";
import { useTasks } from "./tasks.use-case";
import { renderHook, act } from "@testing-library/react-hooks";

jest.mock("@app/data", () => ({
  getTasksFromStorage: jest.fn(),
  saveTasksToStorage: jest.fn(),
}));

describe("useTasks hook unit tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addTask", () => {
    it("should add a new task", () => {
      const inputValue = "New Task";
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask(inputValue);
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].text).toBe(inputValue);
      expect(data.saveTasksToStorage).toHaveBeenCalledWith([
        { text: inputValue, checked: false },
      ]);
    });

    it("should not add a task if the text is empty", () => {
      const inputValue = "";
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask(inputValue);
      });

      expect(result.current.tasks).toHaveLength(0);
      expect(data.saveTasksToStorage).not.toHaveBeenCalled();
    });

    it("should not add a task if the task already exists", () => {
      const inputValue = "Existing Task";
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([
        { text: inputValue, checked: false },
      ]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask(inputValue);
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].text).toBe(inputValue);
      expect(data.saveTasksToStorage).not.toHaveBeenCalled();
    });
  });

  describe("removeTask", () => {
    it("should remove a task", () => {
      const inputValue = "Task to Remove";
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([
        { text: inputValue, checked: false },
      ]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.removeTask(inputValue);
      });

      expect(result.current.tasks).toHaveLength(0);
      expect(data.saveTasksToStorage).toHaveBeenCalledWith([]);
    });
  });

  describe("toggleTask", () => {
    it("should toggle the checked state of a task", () => {
      const inputValue = "Task";
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([
        { text: inputValue, checked: false },
      ]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.toggleTask(inputValue);
      });

      expect(result.current.tasks[0].checked).toBe(true);
      expect(data.saveTasksToStorage).toHaveBeenCalledWith([
        { text: inputValue, checked: true },
      ]);
    });

    it("should reorder tasks when toggled", () => {
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([
        { text: "Task 1", checked: false },
        { text: "Task 2", checked: false },
        { text: "Task 3", checked: false },
      ]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.toggleTask("Task 1");
      });

      expect(result.current.tasks[0].text).toBe("Task 2");
      expect(result.current.tasks[1].text).toBe("Task 3");
      expect(result.current.tasks[2].text).toBe("Task 1");
      expect(data.saveTasksToStorage).toHaveBeenCalledWith([
        { text: "Task 2", checked: false },
        { text: "Task 3", checked: false },
        { text: "Task 1", checked: true },
      ]);
    });
  });
});
