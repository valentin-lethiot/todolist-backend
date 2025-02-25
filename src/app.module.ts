import { Module } from '@nestjs/common';
import { TasksModule } from './app/tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TasksModule,
        MongooseModule.forRoot(process.env.MONGO_URI || 'default_mongo_uri'),
    ],
})
export class AppModule {}
