export enum TaskStatus {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE',
    DELETED = 'DELETED'
}

export type TaskId = string

export type Task = {
    id?: TaskId;
    title: string
        description: string;
    status: TaskStatus;
};

