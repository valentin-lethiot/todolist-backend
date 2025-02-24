import { BaseOutput } from "./base-output.type"

export class CreateTaskOutput extends BaseOutput {
    data: string;

    constructor(code: number, error: string | null, data: string) {
        super(code, error);
        this.data = data;
    }
}