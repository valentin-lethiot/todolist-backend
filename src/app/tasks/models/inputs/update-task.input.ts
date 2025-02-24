import { TaskStatus } from "../task.model";

export type UpdateTaskInput = {
    title: string;
    description: string;
    status: TaskStatus
}