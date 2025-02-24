import { Injectable } from '@nestjs/common';
import { Task, TaskId } from '../models/task.model';
import { ITasksInfra } from './ports/tasks-infra.interface';

@Injectable()
export class TasksInfra implements ITasksInfra {

tasks : Task[] = [
    {
        id: '1',
        title: 'task 1',
        description: 'description 1',
        status: 'TODO'
    },
    {
        id: '2',
        title: 'task 2',
        description: 'description 2',
        status: 'TODO'
    },
    {
        id: '3',
        title: 'task 3',
        description: 'description 3',
        status: 'TODO'
    },
];

    getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: TaskId): Task {
    return this.tasks.find(task => task.id === id)!;
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
