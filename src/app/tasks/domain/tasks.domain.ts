import { Inject, Injectable } from '@nestjs/common';
import { Task, TaskId, TaskStatus } from '../models/task.model';
import { ITasksDomain } from './ports/tasks-domain.interface';
import { ITasksInfra } from '../infrastructure/ports/tasks-infra.interface';
import { CreateTaskInput } from '../models/inputs/create-task.input';

@Injectable()
export class TasksDomain implements ITasksDomain {
    constructor(
        @Inject(ITasksInfra)
        private readonly tasksInfra: ITasksInfra
    ) {}


  getTasks() {
    return this.tasksInfra.getTasks();
  }

  getTask(id: TaskId) {
    return this.tasksInfra.getTask(id);
  }

  createTask(createTaskInput: CreateTaskInput) {
    const taskToCreate: Task = {
        ...createTaskInput,
        status: TaskStatus.TODO
    };

    return this.tasksInfra.createTask(taskToCreate);
  }

//  updateTask(id: TaskId) {
 //   return 'Hello World!';
 // }

  deleteTask(id: TaskId) {
    return this.tasksInfra.deleteTask(id);
 }
}
