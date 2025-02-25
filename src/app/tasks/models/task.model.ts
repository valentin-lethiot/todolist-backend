export enum TaskStatus {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE',
    DELETED = 'DELETED',
}

export type TaskId = string;

export class Task {
    constructor(
        public title: string,
        public description: string,
        public status: TaskStatus,
        public readonly id?: TaskId
    ) {}

    setStatus(status: TaskStatus) {
        this.status = status;
    }
}
