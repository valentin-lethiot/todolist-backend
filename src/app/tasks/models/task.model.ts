export type TaskStatus = 'TODO' | 'DOING' | 'DONE' | 'DELETED';

export type TaskId = string

export type Task = {
    id: TaskId;
    title: string
        description: string;
    status: TaskStatus;
};

