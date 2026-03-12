// src/task/task.module.ts
import { Module } from "@nestjs/common";
import { TasksService } from "src/common/services/task.service";
import { AppController } from "src/common/controllers/app.controller";
import { UsersService } from "src/common/services/user.service";
import { PrismaModule } from "src/common/prisma.module";
import { UtilModule } from "src/common/services/util/util.module";

@Module({
  imports: [UtilModule,PrismaModule],
  controllers: [AppController],
  providers: [TasksService, UsersService] // <--- Agrégalo aquí
})
export class TaskModule {}