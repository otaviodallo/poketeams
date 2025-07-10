import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TeamPokemonService } from './team-pokemon.service';
import {
  CreateTeamPokemonDto,
  TeamPokemonResponseDto,
  UpdateTeamPokemonDto,
  PokemonResponseDto,
  AddPokemonDto,
} from './dto';

@ApiTags('Team Pokemon')
@Controller('team-pokemon')
export class TeamPokemonController {
  constructor(private readonly teamPokemonService: TeamPokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pokémon no time' })
  @ApiResponse({ status: 201, description: 'Pokémon criado com sucesso' })
  async createTeamPokemon(
    @Body() data: CreateTeamPokemonDto,
  ): Promise<TeamPokemonResponseDto> {
    return this.teamPokemonService.createTeamPokemon(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um pokémon no time' })
  @ApiResponse({ status: 200, description: 'Pokémon atualizado com sucesso' })
  async updateTeamPokemon(
    @Param('id') id: string,
    @Body() data: UpdateTeamPokemonDto,
  ): Promise<TeamPokemonResponseDto> {
    return this.teamPokemonService.updateTeamPokemon(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um pokémon do time' })
  @ApiResponse({ status: 200, description: 'Pokémon removido com sucesso' })
  async deleteTeamPokemon(@Param('id') id: string): Promise<void> {
    return this.teamPokemonService.deleteTeamPokemon(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um pokémon específico no time' })
  @ApiResponse({ status: 200, description: 'Pokémon encontrado' })
  async getTeamPokemonById(
    @Param('id') id: string,
  ): Promise<TeamPokemonResponseDto> {
    return this.teamPokemonService.getTeamPokemonById(id);
  }

  @Get('team/:teamId/count')
  @ApiOperation({ summary: 'Contar pokémons em um time' })
  @ApiResponse({ status: 200, description: 'Quantidade de pokémons no time' })
  async countPokemonsInTeam(@Param('teamId') teamId: string): Promise<number> {
    return this.teamPokemonService.countPokemonsInTeam(teamId);
  }

  @Post('teams/:teamId/pokemons')
  @ApiOperation({ summary: 'Adicionar um pokémon a um time específico' })
  @ApiResponse({ status: 201, description: 'Pokémon adicionado com sucesso' })
  async addPokemonToTeam(
    @Param('teamId') teamId: string,
    @Body() addPokemonDto: AddPokemonDto,
  ): Promise<PokemonResponseDto> {
    return this.teamPokemonService.addPokemonToTeam(teamId, addPokemonDto);
  }

  @Delete('teams/:teamId/pokemons/:pokemonId')
  @ApiOperation({ summary: 'Remover um pokémon de um time específico' })
  @ApiResponse({ status: 200, description: 'Pokémon removido com sucesso' })
  async removePokemonFromTeam(
    @Param('teamId') teamId: string,
    @Param('pokemonId') pokemonId: string,
  ): Promise<void> {
    return this.teamPokemonService.removePokemonFromTeam(teamId, pokemonId);
  }

  @Get('teams/:teamId/pokemons')
  @ApiOperation({
    summary: 'Listar todos os pokémons de um time com dados da PokéAPI',
  })
  @ApiResponse({ status: 200, description: 'Lista de pokémons do time' })
  async getPokemonsByTeamId(
    @Param('teamId') teamId: string,
  ): Promise<PokemonResponseDto[]> {
    return this.teamPokemonService.getPokemonsByTeamId(teamId);
  }
}
