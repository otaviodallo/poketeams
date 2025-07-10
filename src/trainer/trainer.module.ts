import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TrainerRepository } from './trainer.repository';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService, TrainerRepository],
})
export class TrainerModule {}
