import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controllers';
import { TasksDomain } from './domain/tasks.domain';
import { ITasksDomain } from './domain/ports/tasks-domain.interface';
import { MongoDBTasksRepository } from './infrastructure/tasks.repository';
import { ITasksRepository } from './infrastructure/ports/tasks-repository.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './infrastructure/task.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    controllers: [TasksController],
    providers: [
        {
            provide: ITasksDomain,
            useClass: TasksDomain,
        },
        {
            provide: ITasksRepository,
            useClass: MongoDBTasksRepository,
        },
    ],
})
export class TasksModule {}
