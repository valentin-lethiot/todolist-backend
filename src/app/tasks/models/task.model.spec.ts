import { Task, TaskStatus } from './task.model';

describe('Task', () => {
    let task: Task;

    beforeEach(() => {
        task = new Task('Test Title', 'Test Description', TaskStatus.TODO);
    });

    it('should create a task with the correct properties', () => {
        expect(task.title).toBe('Test Title');
        expect(task.description).toBe('Test Description');
        expect(task.status).toBe(TaskStatus.TODO);
        expect(task.id).toBeUndefined();
    });

    it('should set the status correctly', () => {
        task.setStatus(TaskStatus.DOING);
        expect(task.status).toBe(TaskStatus.DOING);
    });
});
