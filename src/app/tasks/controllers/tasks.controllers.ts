import { Controller, Get, Post, Put, Delete, Inject, Param, HttpCode, Body } from '@nestjs/common';
import { TasksDomain } from '../domain/tasks.domain';
import { Task, TaskId } from '../models/task.model';
import { ITasksDomain } from '../domain/ports/tasks-domain.interface';
import { CreateTaskOutput } from '../models/outputs/create-task.output';
import { CreateTaskInput } from '../models/inputs/create-task.input';

@Controller("tasks")
export class TasksController {
  constructor(
    @Inject(ITasksDomain)
    private readonly tasksDomain: ITasksDomain
) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksDomain.getTasks();
  }

  
  @Post()
  @HttpCode(201)
  createTask(@Body() createTaskInput: CreateTaskInput):CreateTaskOutput {
    return this.tasksDomain.createTask(createTaskInput);
  }
    
    @Get(':id')
    getTask(@Param('id') id: TaskId): Task {
      return this.tasksDomain.getTask(id);
    }

 // @Put()
  //updateTask(id: TaskId): string {
 //   return this.tasksDomain.updateTask(id);
  //}

  @Delete(':id')
    deleteTask(@Param('id') id: TaskId): string {
    return this.tasksDomain.deleteTask(id);
  }
}
