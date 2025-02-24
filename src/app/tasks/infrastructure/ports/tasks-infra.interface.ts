import { Task, TaskId } from "../../models/task.model";

export interface ITasksInfra {

    getTasks(): Task[];
    getTask(id: TaskId): Task;
    // createTask(id: TaskId): string;
    // updateTask(id: TaskId): string;
    // deleteTask(id: TaskId): string;
}

export const ITasksInfra = Symbol("ITasksInfra");
