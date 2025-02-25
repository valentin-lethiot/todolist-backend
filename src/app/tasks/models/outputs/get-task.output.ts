import { Task } from '../task.model';
import { BaseOutput } from './base-output.type';

export class GetTaskOutput extends BaseOutput {
    data: Task | null;

    constructor(code: number, error: string | null, data: Task | null) {
        super(code, error);
        this.data = data;
    }
}
