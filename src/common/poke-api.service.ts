import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

interface CacheEntry {
  data: PokemonData;
  expiresAt: number;
}

@Injectable()
export class PokeApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 10 * 60 * 1000;

  async getPokemon(pokemonIdOrName: string): Promise<PokemonData> {
    const key = pokemonIdOrName.toLowerCase();
    const now = Date.now();
    const cached = this.cache.get(key);
    if (cached && cached.expiresAt > now) {
      return cached.data;
    }
    try {
      const response = await axios.get(`${this.baseUrl}/pokemon/${key}`);
      const pokemon = response.data;
      const data: PokemonData = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type: any) => type.type.name),
        sprites: pokemon.sprites,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities,
      };
      this.cache.set(key, { data, expiresAt: now + this.CACHE_TTL });
      return data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          `Pokémon '${pokemonIdOrName}' não encontrado na PokéAPI`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Erro ao consultar a PokéAPI',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validatePokemon(pokemonIdOrName: string): Promise<boolean> {
    try {
      await this.getPokemon(pokemonIdOrName);
      return true;
    } catch (error) {
      return error.response?.status === 404;
    }
  }
}
