// src/common/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UtilService } from './services/util/util.service';

@Global()
@Module({
  providers: [PrismaService, UtilService],
  exports: [PrismaService], // Esto permite que UsersService y TasksService usen Prisma
})
export class PrismaModule {}