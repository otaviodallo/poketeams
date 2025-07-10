import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateTeamPokemonDto,
  UpdateTeamPokemonDto,
  TeamPokemonResponseDto,
} from './dto';

@Injectable()
export class TeamPokemonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTeamPokemon(
    data: CreateTeamPokemonDto,
  ): Promise<TeamPokemonResponseDto> {
    return this.prisma.teamPokemon.create({
      data,
    });
  }

  async updateTeamPokemon(
    id: string,
    data: UpdateTeamPokemonDto,
  ): Promise<TeamPokemonResponseDto> {
    return this.prisma.teamPokemon.update({
      where: { id },
      data,
    });
  }

  async deleteTeamPokemon(id: string): Promise<void> {
    await this.prisma.teamPokemon.delete({
      where: { id },
    });
  }

  async getTeamPokemonById(id: string): Promise<TeamPokemonResponseDto> {
    return this.prisma.teamPokemon.findUnique({
      where: { id },
    });
  }

  async getPokemonsByTeamId(teamId: string): Promise<TeamPokemonResponseDto[]> {
    return this.prisma.teamPokemon.findMany({
      where: { teamId },
    });
  }

  async getTeamPokemonByTeamAndPokemonId(
    teamId: string,
    pokemonId: string,
  ): Promise<TeamPokemonResponseDto> {
    return this.prisma.teamPokemon.findFirst({
      where: {
        teamId,
        pokemonId,
      },
    });
  }

  async countPokemonsInTeam(teamId: string): Promise<number> {
    return this.prisma.teamPokemon.count({
      where: { teamId },
    });
  }
}
