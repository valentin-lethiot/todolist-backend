import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controllers';
import { TasksDomain } from './domain/tasks.domain';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksDomain],
})
export class TasksModule {}
