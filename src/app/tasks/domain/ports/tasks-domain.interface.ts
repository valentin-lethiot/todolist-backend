import { Task, TaskId } from "../../models/task.model";

export interface ITasksDomain {

    getTasks(): Task[];
    getTask(id: TaskId): Task;
    // createTask(id: TaskId): string;
    // updateTask(id: TaskId): string;
    // deleteTask(id: TaskId): string;
}

export const ITasksDomain = Symbol("ITasksDomain");
