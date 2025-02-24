import { Injectable } from '@nestjs/common';
import { Task, TaskId } from '../models/task.model';
import { ITasksRepository } from './ports/tasks-repository.interface';
import { UpdateTaskInput } from '../models/inputs/update-task.input';
import { InjectModel } from '@nestjs/mongoose';
import { Task as TaskModel } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongoDBTasksRepository implements ITasksRepository {

constructor(@InjectModel(TaskModel.name) private taskModel: Model<TaskModel>) {}

  async getTasks(): Promise<Task[]> {
    const storedTasks = await this.taskModel.find({ status: { $ne: 'DELETED' } }).exec();
    return storedTasks.map(storedTask => new Task(storedTask.title, storedTask.description, storedTask.status, storedTask._id.toString()));
  }

  async getTask(id: TaskId): Promise<Task | null> {
    const storedTask = await this.taskModel.findById(id).exec();

    return storedTask ? new Task(storedTask.title, storedTask.description, storedTask.status, storedTask._id.toString()) : null;
  }

  async createTask(taskToCreate: Task): Promise<string> {
    const createdTask = new this.taskModel(taskToCreate);
    const savedTask = await createdTask.save();
    return savedTask._id.toString();
  }

  async updateTask(id: string, updateTaskInput: UpdateTaskInput): Promise<string | null> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskInput, { new: true }).exec();
    return updatedTask ? updatedTask._id.toString() : null;
  }
}
