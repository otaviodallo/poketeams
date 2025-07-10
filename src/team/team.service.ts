import { Injectable } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { CreateTeamDto, TeamResponseDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async createTeam(data: CreateTeamDto): Promise<TeamResponseDto> {
    return this.teamRepository.createTeam(data);
  }

  async updateTeam(id: string, data: UpdateTeamDto): Promise<TeamResponseDto> {
    return this.teamRepository.updateTeam(id, data);
  }

  async deleteTeam(id: string): Promise<void> {
    return this.teamRepository.deleteTeam(id);
  }

  async getTeamById(id: string): Promise<TeamResponseDto> {
    return this.teamRepository.getTeamById(id);
  }

  async getTeams(): Promise<TeamResponseDto[]> {
    return this.teamRepository.getTeams();
  }

  async getTeamByTrainerId(trainerId: string): Promise<TeamResponseDto[]> {
    return this.teamRepository.getTeamByTrainerId(trainerId);
  }
}
