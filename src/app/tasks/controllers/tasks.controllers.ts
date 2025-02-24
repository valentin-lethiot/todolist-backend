import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { TasksDomain } from '../domain/tasks.domain';
import { TaskId } from '../models/task.model';

@Controller()
export class TasksController {
  constructor(private readonly tasksDomain: TasksDomain) {}

  @Get()
  getTasks(): string {
    return this.tasksDomain.getTasks();
  }

  @Get()
  getTask(id: TaskId): string {
    return this.tasksDomain.getTasks();
  }

  @Post()
  createTask(id: TaskId): string {
    return this.tasksDomain.getTasks();
  }

  @Put()
  updateTask(id: TaskId): string {
    return this.tasksDomain.getTasks();
  }

  @Delete()
  deleteTask(id: TaskId): string {
    return this.tasksDomain.getTasks();
  }
}
