import { Inject, Injectable } from '@nestjs/common';
import { TaskId } from '../models/task.model';
import { ITasksDomain } from './ports/tasks-domain.interface';
import { ITasksInfra } from '../infrastructure/ports/tasks-infra.interface';

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

 // createTask(id: TaskId) {
 //   return 'Hello World!';
//  }

//  updateTask(id: TaskId) {
 //   return 'Hello World!';
 // }

//  deleteTask(id: TaskId) {
//    return 'Hello World!';
// }
}
