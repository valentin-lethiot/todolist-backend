import { Module } from '@nestjs/common';
import { TasksModule } from './app/tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        TasksModule,
        MongooseModule.forRoot('mongodb://admin:secret@localhost:27017/nestdb?authSource=admin'),
    ],
})
export class AppModule {}
