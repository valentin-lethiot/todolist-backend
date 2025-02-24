import { CreateTaskInput } from "../../models/inputs/create-task.input";
import { UpdateTaskInput } from "../../models/inputs/update-task.input";
import { Task, TaskId } from "../../models/task.model";

export interface ITasksRepository {
    getTasks(): Promise<Task[]>;
    getTask(id: TaskId): Promise<Task | null>;
    createTask(createTaskInput: CreateTaskInput): Promise<string>;
    updateTask(id: string, taskToUpdate: Task): Promise<string | null>;
}

export const ITasksRepository = Symbol("ITasksRepository");
