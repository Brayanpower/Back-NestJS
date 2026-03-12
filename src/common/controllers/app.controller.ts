import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpStatus,
} from '@nestjs/common';

import { User as UserModel, Task as TaskModel } from 'src/generated/prisma/client';
import { TasksService } from '../services/task.service';
import { UsersService } from '../services/user.service';
import { NotFoundError } from 'rxjs';

@Controller("api")
export class AppController {
    constructor(
        private readonly userService: UsersService,
        private readonly taskService: TasksService,
    ) { }

    // Obtener una tarea por ID
    @Get('task/:id')
    async getTaskById(@Param('id') id: string): Promise<TaskModel | null> {
        return this.taskService.getTask({ id: Number(id) });
    }

    // Listar todas las tareas
    @Get('tasks') // El prefijo va solo en el método
    async getTasks(): Promise<TaskModel[]> {
        return this.taskService.getTasks({});
    }

    // Crear una nueva tarea
    @Post('task')
    async createTask(
        @Body() taskData: { name: string; description?: string; userId: number },
    ): Promise<TaskModel> {
        return this.taskService.createTask({
            name: taskData.name,
            description: taskData.description ?? '', // usa vacío si viene undefined
            user: { connect: { id: taskData.userId } },
        });
    }

    // Actualizar una tarea
    @Put('task/:id')
    async updateTask(
        @Param('id') id: string,
        @Body() data: { name?: string; description?: string; priority?: boolean },
    ): Promise<TaskModel> {
        return this.taskService.updateTask({
            where: { id: Number(id) },
            data,
        });
    }

    // Eliminar una tarea
    @Delete('task/:id')
    async deleteTask(@Param('id') id: string): Promise<boolean> {
        try {
            await this.taskService.deleteTask({ id: Number(id) });
            return true
        } catch (error) {
            throw new NotFoundError("Failed to delete task with id " + id);
        }
    }

    // Crear un usuario
    @Post('user')
    async signupUser(
        @Body() userData: { name: string; lastName?: string; email: string; username: string; password: string },
    ): Promise<UserModel> {
        return this.userService.createUser({
            name: userData.name,
            lastName: userData.lastName ?? '', // usa vacío si viene undefined
            email: userData.email,
            username: userData.username,
            password: userData.password,
        });
    }

    @Get('users')
    async getUsers(): Promise<UserModel[]> {
        return this.userService.users({});
    }
    
}