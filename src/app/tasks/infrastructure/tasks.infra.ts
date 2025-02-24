import { Injectable } from '@nestjs/common';
import { Task, TaskId } from '../models/task.model';
import { TaskStatus } from '../models/task.model';
import { ITasksInfra } from './ports/tasks-infra.interface';

@Injectable()
export class TasksInfra implements ITasksInfra {

tasks : Task[] = [
    {
        id: '1',
        title: 'task 1',
        description: 'description 1',
        status: TaskStatus.TODO
    },
    {
        id: '2',
        title: 'task 2',
        description: 'description 2',
        status: TaskStatus.TODO
    },
    {
        id: '3',
        title: 'task 3',
        description: 'description 3',
        status: TaskStatus.TODO
    },
];

  getTasks(): Task[] {
    return this.tasks.filter(task => task.status !== TaskStatus.DELETED);
  }

  getTask(id: TaskId): Task {
    return this.tasks.find(task => task.id === id)!;
  }

  createTask(taskToCreate: Task): string {
    const id = Math.random().toString(36).substring(2, 15);
   
    this.tasks.push({
        id,
        ...taskToCreate
    });

    return id;
  }

//  updateTask(id: TaskId) {
 //   return 'Hello World!';
 // }

  deleteTask(id: TaskId): string {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return 'Task not found';

        task.status = TaskStatus.DELETED;
        return 'Task deleted';
 }
}
