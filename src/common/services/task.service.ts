import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Task, Prisma } from 'src/generated/prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: taskWhereUniqueInput,
    });
  }

  async getTasksById(id: number): Promise<Task | null> {
    const Task = await this.prisma.task.findUnique({
      where: { id },
    });
    return Task;
  }

  async getTasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    const newTask = await this.prisma.task.create({
      data,
    });
    return newTask;
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { data, where } = params;
    const updatedTask = await this.prisma.task.update({
      data,
      where,
    });
    return updatedTask;
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    const deletedTask = await this.prisma.task.delete({
      where,
    });
    return deletedTask;
  }
}