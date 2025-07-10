import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateTeamDto, TeamResponseDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTeam(data: CreateTeamDto): Promise<TeamResponseDto> {
    return this.prisma.team.create({
      data,
    });
  }

  async updateTeam(id: string, data: UpdateTeamDto): Promise<TeamResponseDto> {
    return this.prisma.team.update({
      where: { id },
      data,
    });
  }

  async deleteTeam(id: string): Promise<void> {
    await this.prisma.team.delete({
      where: { id },
    });
  }

  async getTeamById(id: string): Promise<TeamResponseDto> {
    return this.prisma.team.findUnique({
      where: { id },
    });
  }

  async getTeams(): Promise<TeamResponseDto[]> {
    return this.prisma.team.findMany();
  }

  async getTeamByTrainerId(trainerId: string): Promise<TeamResponseDto[]> {
    return this.prisma.team.findMany({
      where: { trainerId },
    });
  }
}
