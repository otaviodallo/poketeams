import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TeamPokemonRepository } from './team-pokemon.repository';
import { PokeApiService } from '../common/poke-api.service';
import { TeamRepository } from '../team/team.repository';
import {
  CreateTeamPokemonDto,
  TeamPokemonResponseDto,
  UpdateTeamPokemonDto,
  PokemonResponseDto,
  AddPokemonDto,
} from './dto';

@Injectable()
export class TeamPokemonService {
  private readonly MAX_POKEMONS_PER_TEAM = 6;

  constructor(
    private readonly teamPokemonRepository: TeamPokemonRepository,
    private readonly pokeApiService: PokeApiService,
    private readonly teamRepository: TeamRepository,
  ) {}

  async createTeamPokemon(
    data: CreateTeamPokemonDto,
  ): Promise<TeamPokemonResponseDto> {
    const team = await this.teamRepository.getTeamById(data.teamId);
    if (!team) {
      throw new HttpException('Time não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.pokeApiService.getPokemon(data.pokemonId);

    const existingPokemon =
      await this.teamPokemonRepository.getTeamPokemonByTeamAndPokemonId(
        data.teamId,
        data.pokemonId,
      );
    if (existingPokemon) {
      throw new HttpException(
        'Pokémon já está neste time',
        HttpStatus.CONFLICT,
      );
    }

    const pokemonCount = await this.teamPokemonRepository.countPokemonsInTeam(
      data.teamId,
    );
    if (pokemonCount >= this.MAX_POKEMONS_PER_TEAM) {
      throw new HttpException(
        `Time já possui o máximo de ${this.MAX_POKEMONS_PER_TEAM} pokémons`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.teamPokemonRepository.createTeamPokemon(data);
  }

  async addPokemonToTeam(
    teamId: string,
    addPokemonDto: AddPokemonDto,
  ): Promise<PokemonResponseDto> {
    const team = await this.teamRepository.getTeamById(teamId);
    if (!team) {
      throw new HttpException('Time não encontrado', HttpStatus.NOT_FOUND);
    }

    const pokemonData = await this.pokeApiService.getPokemon(
      addPokemonDto.pokemonId,
    );

    const existingPokemon =
      await this.teamPokemonRepository.getTeamPokemonByTeamAndPokemonId(
        teamId,
        addPokemonDto.pokemonId,
      );
    if (existingPokemon) {
      throw new HttpException(
        'Pokémon já está neste time',
        HttpStatus.CONFLICT,
      );
    }

    const pokemonCount =
      await this.teamPokemonRepository.countPokemonsInTeam(teamId);
    if (pokemonCount >= this.MAX_POKEMONS_PER_TEAM) {
      throw new HttpException(
        `Time já possui o máximo de ${this.MAX_POKEMONS_PER_TEAM} pokémons`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const teamPokemon = await this.teamPokemonRepository.createTeamPokemon({
      teamId,
      pokemonId: addPokemonDto.pokemonId,
    });

    return {
      id: teamPokemon.id,
      pokemonId: teamPokemon.pokemonId,
      name: pokemonData.name,
      types: pokemonData.types,
      sprite: pokemonData.sprites.front_default,
      createdAt: teamPokemon.createdAt,
    };
  }

  async removePokemonFromTeam(
    teamId: string,
    pokemonId: string,
  ): Promise<void> {
    const team = await this.teamRepository.getTeamById(teamId);
    if (!team) {
      throw new HttpException('Time não encontrado', HttpStatus.NOT_FOUND);
    }

    const teamPokemon =
      await this.teamPokemonRepository.getTeamPokemonByTeamAndPokemonId(
        teamId,
        pokemonId,
      );
    if (!teamPokemon) {
      throw new HttpException(
        'Pokémon não encontrado neste time',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.teamPokemonRepository.deleteTeamPokemon(teamPokemon.id);
  }

  async getPokemonsByTeamId(teamId: string): Promise<PokemonResponseDto[]> {
    const team = await this.teamRepository.getTeamById(teamId);
    if (!team) {
      throw new HttpException('Time não encontrado', HttpStatus.NOT_FOUND);
    }

    const teamPokemons =
      await this.teamPokemonRepository.getPokemonsByTeamId(teamId);

    const enrichedPokemons = await Promise.all(
      teamPokemons.map(async (teamPokemon) => {
        try {
          const pokemonData = await this.pokeApiService.getPokemon(
            teamPokemon.pokemonId,
          );
          return {
            id: teamPokemon.id,
            pokemonId: teamPokemon.pokemonId,
            name: pokemonData.name,
            types: pokemonData.types,
            sprite: pokemonData.sprites.front_default,
            createdAt: teamPokemon.createdAt,
          };
        } catch {
          return {
            id: teamPokemon.id,
            pokemonId: teamPokemon.pokemonId,
            name: teamPokemon.pokemonId,
            types: [],
            sprite: '',
            createdAt: teamPokemon.createdAt,
          };
        }
      }),
    );

    return enrichedPokemons;
  }

  async updateTeamPokemon(
    id: string,
    data: UpdateTeamPokemonDto,
  ): Promise<TeamPokemonResponseDto> {
    return this.teamPokemonRepository.updateTeamPokemon(id, data);
  }

  async deleteTeamPokemon(id: string): Promise<void> {
    return this.teamPokemonRepository.deleteTeamPokemon(id);
  }

  async getTeamPokemonById(id: string): Promise<TeamPokemonResponseDto> {
    return this.teamPokemonRepository.getTeamPokemonById(id);
  }

  async countPokemonsInTeam(teamId: string): Promise<number> {
    return this.teamPokemonRepository.countPokemonsInTeam(teamId);
  }
}
