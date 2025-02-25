import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskStatus } from '../models/task.model';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE', 'DELETED'], required: true })
    status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
