import { Module } from '@nestjs/common';
import { TasksModule } from './app/tasks/tasks.module';

@Module({
  imports: [TasksModule],
})
export class AppModule {}
