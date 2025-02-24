import { CreateTaskInput } from "../../models/inputs/create-task.input";
import { UpdateTaskInput } from "../../models/inputs/update-task.input";
import { CreateTaskOutput } from "../../models/outputs/create-task.output";
import { DeleteTaskOutput } from "../../models/outputs/delete-task.output";
import { GetTaskOutput } from "../../models/outputs/get-task.output";
import { GetTasksOutput } from "../../models/outputs/get-tasks.output";
import { UpdateTaskOutput } from "../../models/outputs/update-task.output";
import { TaskId } from "../../models/task.model";

export interface ITasksDomain {
    getTasks(): Promise<GetTasksOutput>;
    getTask(id: TaskId): Promise<GetTaskOutput>;
    createTask(createTaskInput: CreateTaskInput): Promise<CreateTaskOutput>;
    updateTask(id: TaskId, updateTaskInput: UpdateTaskInput): Promise<UpdateTaskOutput>;
    deleteTask(id: TaskId): Promise<DeleteTaskOutput>;
}

export const ITasksDomain = Symbol("ITasksDomain");
