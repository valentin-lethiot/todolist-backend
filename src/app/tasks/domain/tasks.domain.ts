import { Injectable } from '@nestjs/common';
import { TaskId } from '../models/task.model';

@Injectable()
export class TasksDomain {
  getTasks() {
    return 'Hello World!';
  }

  getTask(id: TaskId) {
    return 'Hello World!';
  }

  createTask(id: TaskId) {
    return 'Hello World!';
  }

  updateTask(id: TaskId) {
    return 'Hello World!';
  }

  deleteTask(id: TaskId) {
    return 'Hello World!';
  }
}
