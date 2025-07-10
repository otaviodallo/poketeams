import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto, TrainerResponseDto, UpdateTrainerDto } from './dto';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  async createTrainer(
    @Body() data: CreateTrainerDto,
  ): Promise<TrainerResponseDto> {
    return this.trainerService.createTrainer(data);
  }

  @Put(':id')
  async updateTrainer(
    @Param('id') id: string,
    @Body() data: UpdateTrainerDto,
  ): Promise<TrainerResponseDto> {
    return this.trainerService.updateTrainer(id, data);
  }

  @Delete(':id')
  async deleteTrainer(@Param('id') id: string): Promise<void> {
    return this.trainerService.deleteTrainer(id);
  }

  @Get(':id')
  async getTrainerById(@Param('id') id: string): Promise<TrainerResponseDto> {
    return this.trainerService.getTrainerById(id);
  }

  @Get()
  async getTrainers(): Promise<TrainerResponseDto[]> {
    return this.trainerService.getTrainers();
  }
}
