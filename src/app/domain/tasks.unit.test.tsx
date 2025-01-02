import * as data from "@app/data";
import { useTasks } from "./tasks.use-case";
import { renderHook, act } from "@testing-library/react-hooks";

jest.mock("@app/data", () => ({
  getTasksFromStorage: jest.fn(),
  saveTasksToStorage: jest.fn(),
}));

describe("useTasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addTask", () => {
    it("should add a new task", () => {
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask("New Task");
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].text).toBe("New Task");
      expect(data.saveTasksToStorage).toHaveBeenCalledWith([
        { text: "New Task", checked: false },
      ]);
    });

    it("should not add a task if the text is empty", () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask("");
      });

      expect(result.current.tasks).toHaveLength(0);
      expect(data.saveTasksToStorage).not.toHaveBeenCalled();
    });

    it("should not add a task if the task already exists", () => {
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([
        { text: "Existing Task", checked: false },
      ]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask("Existing Task");
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].text).toBe("Existing Task");
      expect(data.saveTasksToStorage).not.toHaveBeenCalled();
    });
  });

  describe("removeTask", () => {
    it("should remove a task", () => {
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([
        { text: "Task to Remove", checked: false },
      ]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.removeTask("Task to Remove");
      });

      expect(result.current.tasks).toHaveLength(0);
      expect(data.saveTasksToStorage).toHaveBeenCalledWith([]);
    });
  });

  describe("toggleTask", () => {
    it("should toggle the checked state of a task", () => {
      (data.getTasksFromStorage as jest.Mock).mockReturnValue([
        { text: "Task", checked: false },
      ]);

      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.toggleTask("Task");
      });

      expect(result.current.tasks[0].checked).toBe(true);
      expect(data.saveTasksToStorage).toHaveBeenCalledWith([
        { text: "Task", checked: true },
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
