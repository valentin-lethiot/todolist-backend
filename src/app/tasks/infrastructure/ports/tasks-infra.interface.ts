import { CreateTaskInput } from "../../models/inputs/create-task.input";
import { UpdateTaskInput } from "../../models/inputs/update-task.input";
import { Task, TaskId } from "../../models/task.model";

export interface ITasksInfra {

    getTasks(): Task[];
    getTask(id: TaskId): Task;
    createTask(createTaskInput: CreateTaskInput): string;
    updateTask(id: TaskId, updateTaskInput: UpdateTaskInput): string;
    deleteTask(id: TaskId): string;
}

export const ITasksInfra = Symbol("ITasksInfra");
