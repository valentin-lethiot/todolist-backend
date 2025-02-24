import { Task, TaskId } from "../../models/task.model";

export interface ITasksInfra {

    getTasks(): Task[];
    getTask(id: TaskId): Task;
    createTask(taskToCreate: Task): string;
    // updateTask(id: TaskId): string;
    deleteTask(id: TaskId): string;
}

export const ITasksInfra = Symbol("ITasksInfra");
