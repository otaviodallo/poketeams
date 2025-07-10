import { Injectable } from '@nestjs/common';
import { TrainerRepository } from './trainer.repository';
import { CreateTrainerDto, TrainerResponseDto, UpdateTrainerDto } from './dto';

@Injectable()
export class TrainerService {
  constructor(private readonly trainerRepository: TrainerRepository) {}

  async createTrainer(data: CreateTrainerDto): Promise<TrainerResponseDto> {
    return this.trainerRepository.createTrainer(data);
  }

  async updateTrainer(
    id: string,
    data: UpdateTrainerDto,
  ): Promise<TrainerResponseDto> {
    return this.trainerRepository.updateTrainer(id, data);
  }

  async deleteTrainer(id: string): Promise<void> {
    return this.trainerRepository.deleteTrainer(id);
  }

  async getTrainerById(id: string): Promise<TrainerResponseDto> {
    return this.trainerRepository.getTrainerById(id);
  }

  async getTrainers(): Promise<TrainerResponseDto[]> {
    return this.trainerRepository.getTrainers();
  }
}
