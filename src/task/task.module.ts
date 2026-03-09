// src/task/task.module.ts
import { Module } from "@nestjs/common";
import { TasksService } from "src/common/services/task.service";
import { AppController } from "src/common/controllers/app.controller";
import { UsersService } from "src/common/services/user.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TasksService, UsersService] // <--- Agrégalo aquí
})
export class TaskModule {}