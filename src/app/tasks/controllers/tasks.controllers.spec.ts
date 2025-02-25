import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controllers';
import { ITasksDomain } from '../domain/ports/tasks-domain.interface';
import { CreateTaskInput } from '../models/inputs/create-task.input';
import { UpdateTaskInput } from '../models/inputs/update-task.input';
import { Task, TaskStatus } from '../models/task.model';
import { GetTasksOutput } from '../models/outputs/get-tasks.output';
import { GetTaskOutput } from '../models/outputs/get-task.output';
import { CreateTaskOutput } from '../models/outputs/create-task.output';
import { UpdateTaskOutput } from '../models/outputs/update-task.output';
import { DeleteTaskOutput } from '../models/outputs/delete-task.output';

describe('TasksController', () => {
    let controller: TasksController;
    let tasksDomainMock: jest.Mocked<ITasksDomain>;

    const mockTask = new Task('Test Task', 'Test Description', TaskStatus.TODO, '123');

    beforeEach(async () => {
        tasksDomainMock = {
            getTasks: jest.fn(),
            getTask: jest.fn(),
            createTask: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: ITasksDomain,
                    useValue: tasksDomainMock,
                },
            ],
        }).compile();

        controller = module.get<TasksController>(TasksController);
    });

    describe('getTasks', () => {
        it('should call the domain and return an array of tasks', async () => {
            const expectedTasks = [mockTask];
            tasksDomainMock.getTasks.mockResolvedValue(
                new GetTasksOutput(200, null, expectedTasks)
            );

            const result = await controller.getTasks();

            expect(result).toEqual(new GetTasksOutput(200, null, expectedTasks));
            expect(tasksDomainMock.getTasks).toHaveBeenCalled();
        });
    });

    describe('getTask', () => {
        it('should call the domain and return a single task', async () => {
            tasksDomainMock.getTask.mockResolvedValue(new GetTaskOutput(200, null, mockTask));

            const result = await controller.getTask('123');

            expect(result).toEqual(new GetTaskOutput(200, null, mockTask));
            expect(tasksDomainMock.getTask).toHaveBeenCalledWith('123');
        });
    });

    describe('createTask', () => {
        it('should call the domain and create a task', async () => {
            const createTaskInput: CreateTaskInput = {
                title: 'New Task',
                description: 'New Description',
            };
            tasksDomainMock.createTask.mockResolvedValue(new CreateTaskOutput(201, null, '456'));

            const result = await controller.createTask(createTaskInput);

            expect(result.data).toBe('456');
            expect(tasksDomainMock.createTask).toHaveBeenCalledWith(createTaskInput);
        });
    });

    describe('updateTask', () => {
        it('should call the domain and update a task', async () => {
            const updateTaskInput: UpdateTaskInput = {
                title: 'Updated Task',
                description: 'Updated Description',
                status: TaskStatus.DOING,
            };

            tasksDomainMock.updateTask.mockResolvedValue(new UpdateTaskOutput(200, null, '123'));

            const result = await controller.updateTask('123', updateTaskInput);

            expect(result.data).toBe('123');
            expect(tasksDomainMock.updateTask).toHaveBeenCalledWith('123', updateTaskInput);
        });
    });

    describe('deleteTask', () => {
        it('should call the domain and delete a task', async () => {
            tasksDomainMock.deleteTask.mockResolvedValue(new DeleteTaskOutput(201, null, '123'));

            const result = await controller.deleteTask('123');

            expect(result.data).toBe('123');
            expect(tasksDomainMock.deleteTask).toHaveBeenCalledWith('123');
        });
    });
});
