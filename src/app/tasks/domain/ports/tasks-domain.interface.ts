import { CreateTaskInput } from "../../models/inputs/create-task.input";
import { UpdateTaskInput } from "../../models/inputs/update-task.input";
import { Task, TaskId } from "../../models/task.model";

export interface ITasksDomain {
    getTasks(): Promise<Task[]>;
    getTask(id: TaskId): Promise<Task | null>;
    createTask(createTaskInput: CreateTaskInput): Promise<string>;
    updateTask(id: TaskId, updateTaskInput: UpdateTaskInput): Promise<string>;
    deleteTask(id: TaskId): Promise<string>;
}

export const ITasksDomain = Symbol("ITasksDomain");
