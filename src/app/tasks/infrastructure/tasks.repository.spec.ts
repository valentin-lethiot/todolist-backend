import { MongoDBTasksRepository } from './tasks.repository';
import { Task, TaskStatus } from '../models/task.model';
import { ITasksRepository } from './ports/tasks-repository.interface';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

describe('MongoDBTasksRepository', () => {
    let tasksRepository: MongoDBTasksRepository;
    let taskModel: Model<Task>;

    const mockTaskModel = {
        find: jest.fn(),
        findById: jest.fn(),
        save: jest.fn(),
        findByIdAndUpdate: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MongoDBTasksRepository,
                {
                    provide: getModelToken('Task'),
                    useValue: mockTaskModel,
                },
            ],
        }).compile();

        tasksRepository = module.get<MongoDBTasksRepository>(MongoDBTasksRepository);
        taskModel = module.get<Model<Task>>(getModelToken('Task'));
    });

    describe('getTasks', () => {
        it('should get tasks', async () => {
            const mockTasks = [
                {
                    title: 'Test Task',
                    description: 'Test Description',
                    status: TaskStatus.TODO,
                    _id: '1',
                },
            ];
            (mockTaskModel.find as jest.Mock).mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockTasks),
            });

            const tasks = await tasksRepository.getTasks();
            expect(tasks).toEqual([
                new Task('Test Task', 'Test Description', TaskStatus.TODO, '1'),
            ]);
        });
    });

    describe('getTask', () => {
        it('should get a task by id', async () => {
            const mockTask = {
                title: 'Test Task',
                description: 'Test Description',
                status: TaskStatus.TODO,
                _id: '1',
            };
            (mockTaskModel.findById as jest.Mock).mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockTask),
            });

            const task = await tasksRepository.getTask('1');
            expect(task).toEqual(new Task('Test Task', 'Test Description', TaskStatus.TODO, '1'));
        });

        it('should return null if task not found', async () => {
            (mockTaskModel.findById as jest.Mock).mockReturnValue({
                exec: jest.fn().mockResolvedValue(null),
            });

            const task = await tasksRepository.getTask('1');
            expect(task).toBeNull();
        });
    });

    describe('updateTask', () => {
        it('should update a task', async () => {
            const updatedTask = {
                title: 'Updated Task',
                description: 'Updated Description',
                status: TaskStatus.DOING,
            };
            (mockTaskModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
                exec: jest.fn().mockResolvedValue({ _id: '1' }),
            });

            const result = await tasksRepository.updateTask('1', updatedTask);
            expect(result).toBe('1');
        });

        it('should return null when updating a non-existent task', async () => {
            (mockTaskModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
                exec: jest.fn().mockResolvedValue(null),
            });

            const result = await tasksRepository.updateTask('1', {
                title: 'Updated Task',
                description: 'Updated Description',
                status: TaskStatus.DOING,
            });
            expect(result).toBeNull();
        });
    });
});
