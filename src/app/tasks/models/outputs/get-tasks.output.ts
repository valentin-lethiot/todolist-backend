import { Task } from "../task.model";
import { BaseOutput } from "./base-output.type"

export class GetTasksOutput extends BaseOutput {
    data: Task[];

    constructor(code: number, error: string | null, data: Task[]) {
        super(code, error);
        this.data = data;
    }
}