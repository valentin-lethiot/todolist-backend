import { Controller, Get, Post, Put, Delete, Inject, Param, HttpCode, Body } from '@nestjs/common';
import { TaskId } from '../models/task.model';
import { ITasksDomain } from '../domain/ports/tasks-domain.interface';
import { CreateTaskOutput } from '../models/outputs/create-task.output';
import { CreateTaskInput } from '../models/inputs/create-task.input';
import { UpdateTaskInput } from '../models/inputs/update-task.input';
import { GetTasksOutput } from '../models/outputs/get-tasks.output';
import { GetTaskOutput } from '../models/outputs/get-task.output';
import { UpdateTaskOutput } from '../models/outputs/update-task.output';
import { DeleteTaskOutput } from '../models/outputs/delete-task.output';

@Controller('tasks')
export class TasksController {
    constructor(
        @Inject(ITasksDomain)
        private readonly tasksDomain: ITasksDomain
    ) {}

    @Get()
    getTasks(): Promise<GetTasksOutput> {
        return this.tasksDomain.getTasks();
    }

    @Post()
    createTask(@Body() createTaskInput: CreateTaskInput): Promise<CreateTaskOutput> {
        return this.tasksDomain.createTask(createTaskInput);
    }

    @Get(':id')
    getTask(@Param('id') id: TaskId): Promise<GetTaskOutput> {
        return this.tasksDomain.getTask(id);
    }

    @Put(':id')
    updateTask(
        @Param('id') id: TaskId,
        @Body() updateTaskInput: UpdateTaskInput
    ): Promise<UpdateTaskOutput> {
        return this.tasksDomain.updateTask(id, updateTaskInput);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: TaskId): Promise<DeleteTaskOutput> {
        return this.tasksDomain.deleteTask(id);
    }
}
