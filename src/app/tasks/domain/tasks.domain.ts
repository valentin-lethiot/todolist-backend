import { Inject, Injectable } from '@nestjs/common';
import { Task, TaskId, TaskStatus } from '../models/task.model';
import { ITasksDomain } from './ports/tasks-domain.interface';
import { ITasksRepository } from '../infrastructure/ports/tasks-repository.interface';
import { CreateTaskInput } from '../models/inputs/create-task.input';
import { UpdateTaskInput } from '../models/inputs/update-task.input';

@Injectable()
export class TasksDomain implements ITasksDomain {
    constructor(
        @Inject(ITasksRepository)
        private readonly tasksRepository: ITasksRepository
    ) {}


  getTasks() {
    return this.tasksRepository.getTasks();
  }

  getTask(id: TaskId) {
    return this.tasksRepository.getTask(id);
  }

  createTask(createTaskInput: CreateTaskInput) {
    const taskToCreate = new Task(createTaskInput.title, createTaskInput.description, TaskStatus.TODO);

    return this.tasksRepository.createTask(taskToCreate);
  }

  updateTask(id: TaskId, updateTaskInput: UpdateTaskInput) {
    const taskToUpdate = new Task(updateTaskInput.title, updateTaskInput.description, updateTaskInput.status, id);

    return this.tasksRepository.updateTask(id, taskToUpdate);
 }

  async deleteTask(id: TaskId) {
    const taskToDelete = await this.tasksRepository.getTask(id);
    if (!taskToDelete) return 'Task not found';

    taskToDelete.setStatus(TaskStatus.DELETED);
    return this.tasksRepository.updateTask(id, taskToDelete);
 }
}
