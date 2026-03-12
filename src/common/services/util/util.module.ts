import { Module } from '@nestjs/common';
import { UtilService } from './util.service';

@Module({
  providers: [UtilService],
  exports: [UtilService], // 👈 Exporta para que otros módulos lo usen
})
export class UtilModule {}