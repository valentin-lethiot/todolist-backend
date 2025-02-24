import { Controller, Get, Post, Put, Delete, Inject, Param } from '@nestjs/common';
import { TasksDomain } from '../domain/tasks.domain';
import { Task, TaskId } from '../models/task.model';
import { ITasksDomain } from '../domain/ports/tasks-domain.interface';

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

  
  //@Post()
  //@HttpCode(204)
  //createTask(id: TaskId): string {
    //  return this.tasksDomain.createTask(id);
    //}
    
    @Get(':id')
    getTask(@Param('id') id: TaskId): Task {
      return this.tasksDomain.getTask(id);
    }

 // @Put()
  //updateTask(id: TaskId): string {
 //   return this.tasksDomain.updateTask(id);
  //}

//  @Delete()
 // deleteTask(id: TaskId): string {
//    return this.tasksDomain.deleteTask(id);
 // }
}
