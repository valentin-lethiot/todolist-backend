import { TasksDomain } from './tasks.domain';
import { ITasksRepository } from '../infrastructure/ports/tasks-repository.interface';
import { Task, TaskStatus } from '../models/task.model';
import { CreateTaskInput } from '../models/inputs/create-task.input';
import { GetTasksOutput } from '../models/outputs/get-tasks.output';
import { GetTaskOutput } from '../models/outputs/get-task.output';
import { CreateTaskOutput } from '../models/outputs/create-task.output';
import { UpdateTaskOutput } from '../models/outputs/update-task.output';
import { DeleteTaskOutput } from '../models/outputs/delete-task.output';

describe('TasksDomain', () => {
    let tasksDomain: TasksDomain;
    let tasksRepository: ITasksRepository;

    beforeEach(() => {
        tasksRepository = {
            getTasks: jest.fn(),
            getTask: jest.fn(),
            createTask: jest.fn(),
            updateTask: jest.fn(),
        } as unknown as ITasksRepository;

        tasksDomain = new TasksDomain(tasksRepository);
    });

    describe('getTasks', () => {
        it('should call the repository and return an array of tasks', async () => {
            const mockTasks = [new Task('Test Task', 'Test Description', TaskStatus.TODO)];
            (tasksRepository.getTasks as jest.Mock).mockResolvedValue(mockTasks);

            const result = await tasksDomain.getTasks();
            expect(result).toEqual(new GetTasksOutput(200, null, mockTasks));
        });
    });

    describe('getTask', () => {
        it('should call the repository and return a single task', async () => {
            const mockTask = new Task('Test Task', 'Test Description', TaskStatus.TODO);
            (tasksRepository.getTask as jest.Mock).mockResolvedValue(mockTask);

            const result = await tasksDomain.getTask('1');
            expect(result).toEqual(new GetTaskOutput(200, null, mockTask));
        });

        it('should return 404 if task not found', async () => {
            (tasksRepository.getTask as jest.Mock).mockResolvedValue(null);

            const result = await tasksDomain.getTask('1');
            expect(result).toEqual(new GetTaskOutput(404, 'Task not found', null));
        });
    });

    describe('createTask', () => {
        it('should call the repository and create a task', async () => {
            const createTaskInput: CreateTaskInput = {
                title: 'New Task',
                description: 'New Description',
            };
            (tasksRepository.createTask as jest.Mock).mockResolvedValue('1');

            const result = await tasksDomain.createTask(createTaskInput);
            expect(result).toEqual(new CreateTaskOutput(201, null, '1'));
        });
    });

    describe('updateTask', () => {
        it('should call the repository and update a task', async () => {
            const updateTaskInput = {
                title: 'Updated Task',
                description: 'Updated Description',
                status: TaskStatus.DOING,
            };
            (tasksRepository.updateTask as jest.Mock).mockResolvedValue('1');

            const result = await tasksDomain.updateTask('1', updateTaskInput);
            expect(result).toEqual(new UpdateTaskOutput(200, null, '1'));
        });

        it('should return 404 when updating a non-existent task', async () => {
            const updateTaskInput = {
                title: 'Updated Task',
                description: 'Updated Description',
                status: TaskStatus.DOING,
            };
            (tasksRepository.updateTask as jest.Mock).mockResolvedValue(null);

            const result = await tasksDomain.updateTask('1', updateTaskInput);
            expect(result).toEqual(new UpdateTaskOutput(404, 'Task not found', null));
        });
    });

    describe('deleteTask', () => {
        it('should call the repository and delete a task', async () => {
            const mockTask = new Task('Test Task', 'Test Description', TaskStatus.TODO, '1');
            (tasksRepository.getTask as jest.Mock).mockResolvedValue(mockTask);
            (tasksRepository.updateTask as jest.Mock).mockResolvedValue(mockTask);

            const result = await tasksDomain.deleteTask('1');
            expect(result).toEqual(new DeleteTaskOutput(201, null, '1'));
        });

        it('should return 404 when deleting a non-existent task', async () => {
            (tasksRepository.getTask as jest.Mock).mockResolvedValue(null);

            const result = await tasksDomain.deleteTask('1');
            expect(result).toEqual(new DeleteTaskOutput(404, 'Task not found', null));
        });
    });
});
