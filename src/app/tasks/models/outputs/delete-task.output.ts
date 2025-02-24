import { BaseOutput } from "./base-output.type"

export class DeleteTaskOutput extends BaseOutput {
    data: string | null;

    constructor(code: number, error: string | null, data: string | null) {
        super(code, error);
        this.data = data;
    }
}