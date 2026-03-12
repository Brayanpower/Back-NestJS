import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './common/prisma.module';
import { TaskService } from './task/task.service';
import { UsersService } from './common/services/user.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [AuthModule,TaskModule,PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
