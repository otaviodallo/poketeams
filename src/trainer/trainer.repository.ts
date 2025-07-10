import { Injectable } from '@nestjs/common';
import { CreateTrainerDto, UpdateTrainerDto, TrainerResponseDto } from './dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TrainerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTrainer(data: CreateTrainerDto): Promise<TrainerResponseDto> {
    return this.prisma.trainer.create({
      data,
    });
  }

  async updateTrainer(
    id: string,
    data: UpdateTrainerDto,
  ): Promise<TrainerResponseDto> {
    return this.prisma.trainer.update({
      where: { id },
      data,
    });
  }

  async deleteTrainer(id: string): Promise<void> {
    await this.prisma.trainer.delete({
      where: { id },
    });
  }

  async getTrainerById(id: string): Promise<TrainerResponseDto> {
    return this.prisma.trainer.findUnique({
      where: { id },
    });
  }

  async getTrainers(): Promise<TrainerResponseDto[]> {
    return this.prisma.trainer.findMany();
  }
}
