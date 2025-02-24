import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controllers';
import { TasksDomain } from './domain/tasks.domain';
import { ITasksDomain } from './domain/ports/tasks-domain.interface';
import { TasksInfra } from './infrastructure/tasks.infra';
import { ITasksInfra } from './infrastructure/ports/tasks-infra.interface';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [{
    provide: ITasksDomain,
    useClass: TasksDomain
  },
  {
    provide: ITasksInfra,
    useClass: TasksInfra  
  }
],
})
export class TasksModule {}
