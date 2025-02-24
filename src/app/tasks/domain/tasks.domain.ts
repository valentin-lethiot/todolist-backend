import { Inject, Injectable } from '@nestjs/common';
import { Task, TaskId, TaskStatus } from '../models/task.model';
import { ITasksDomain } from './ports/tasks-domain.interface';
import { ITasksRepository } from '../infrastructure/ports/tasks-repository.interface';
import { CreateTaskInput } from '../models/inputs/create-task.input';
import { UpdateTaskInput } from '../models/inputs/update-task.input';
import { GetTasksOutput } from '../models/outputs/get-tasks.output';
import { CreateTaskOutput } from '../models/outputs/create-task.output';
import { GetTaskOutput } from '../models/outputs/get-task.output';
import { UpdateTaskOutput } from '../models/outputs/update-task.output';
import { DeleteTaskOutput } from '../models/outputs/delete-task.output';

@Injectable()
export class TasksDomain implements ITasksDomain {
    constructor(
        @Inject(ITasksRepository)
        private readonly tasksRepository: ITasksRepository
    ) {}


  async getTasks(): Promise<GetTasksOutput> {
     const tasks = await this.tasksRepository.getTasks();
     return new GetTasksOutput(200, null, tasks);
  }

  async getTask(id: TaskId): Promise<GetTaskOutput> {
    const fetchedTask = await this.tasksRepository.getTask(id);
    if (!fetchedTask) return new GetTaskOutput(404, 'Task not found', null);

    return new GetTaskOutput(200, null, fetchedTask);
  }

  async createTask(createTaskInput: CreateTaskInput): Promise<CreateTaskOutput> {
    const taskToCreate = new Task(createTaskInput.title, createTaskInput.description, TaskStatus.TODO);

    const createdId = await this.tasksRepository.createTask(taskToCreate);
    return new CreateTaskOutput(201, null, createdId);
    
  }

  async updateTask(id: TaskId, updateTaskInput: UpdateTaskInput): Promise<UpdateTaskOutput> {
    const taskToUpdate = new Task(updateTaskInput.title, updateTaskInput.description, updateTaskInput.status, id);

    const updatedTask = await this.tasksRepository.updateTask(id, taskToUpdate);
    if (!updatedTask) return new UpdateTaskOutput(404, 'Task not found', null);

    return new UpdateTaskOutput(200, null, updatedTask);
 }

  async deleteTask(id: TaskId): Promise<DeleteTaskOutput> {
    const taskToDelete = await this.tasksRepository.getTask(id);
    if (!taskToDelete) return new DeleteTaskOutput(404, 'Task not found', null);

    taskToDelete.setStatus(TaskStatus.DELETED);
    await this.tasksRepository.updateTask(id, taskToDelete);
    return new DeleteTaskOutput(201, null, id);
 }
}
