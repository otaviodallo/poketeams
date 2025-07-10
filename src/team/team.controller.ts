import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, TeamResponseDto, UpdateTeamDto } from './dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async createTeam(@Body() data: CreateTeamDto): Promise<TeamResponseDto> {
    console.log(data);
    return this.teamService.createTeam(data);
  }

  @Put(':id')
  async updateTeam(
    @Param('id') id: string,
    @Body() data: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    return this.teamService.updateTeam(id, data);
  }

  @Delete(':id')
  async deleteTeam(@Param('id') id: string): Promise<void> {
    return this.teamService.deleteTeam(id);
  }

  @Get(':id')
  async getTeamById(@Param('id') id: string): Promise<TeamResponseDto> {
    return this.teamService.getTeamById(id);
  }

  @Get()
  async getTeams(): Promise<TeamResponseDto[]> {
    return this.teamService.getTeams();
  }

  @Get('trainer/:trainerId')
  async getTeamByTrainerId(
    @Param('trainerId') trainerId: string,
  ): Promise<TeamResponseDto[]> {
    return this.teamService.getTeamByTrainerId(trainerId);
  }
}
