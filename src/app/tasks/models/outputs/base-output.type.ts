export class BaseOutput {
    code: number;
    error: string | null;

    constructor(code: number, error: string | null) {
        this.code = code;
        this.error = error;
    }
}
