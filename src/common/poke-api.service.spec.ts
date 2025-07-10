import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { PokeApiService } from './poke-api.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PokeApiService', () => {
  let service: PokeApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokeApiService],
    }).compile();

    service = module.get<PokeApiService>(PokeApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemon', () => {
    it('should return pokemon data when pokemon exists', async () => {
      const mockPokemonData = {
        id: 25,
        name: 'pikachu',
        types: [{ type: { name: 'electric' } }],
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
        height: 4,
        weight: 60,
        abilities: [{ ability: { name: 'static' } }],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockPokemonData });

      const result = await service.getPokemon('pikachu');

      expect(result).toEqual({
        id: 25,
        name: 'pikachu',
        types: ['electric'],
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
        height: 4,
        weight: 60,
        abilities: [{ ability: { name: 'static' } }],
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu',
      );
    });

    it('should convert pokemon name to lowercase', async () => {
      const mockPokemonData = {
        id: 25,
        name: 'pikachu',
        types: [],
        sprites: { front_default: '' },
        height: 4,
        weight: 60,
        abilities: [],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockPokemonData });

      await service.getPokemon('Pikachu');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu',
      );
    });

    it('should throw HttpException when pokemon not found', async () => {
      const error = {
        response: { status: 404 },
      };

      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(service.getPokemon('invalid-pokemon')).rejects.toThrow(
        new HttpException(
          "Pokémon 'invalid-pokemon' não encontrado na PokéAPI",
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should throw HttpException for other API errors', async () => {
      const error = {
        response: { status: 500 },
      };

      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(service.getPokemon('pikachu')).rejects.toThrow(
        new HttpException(
          'Erro ao consultar a PokéAPI',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should throw HttpException when axios throws without response', async () => {
      const error = new Error('Network error');

      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(service.getPokemon('pikachu')).rejects.toThrow(
        new HttpException(
          'Erro ao consultar a PokéAPI',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('validatePokemon', () => {
    it('should return true when pokemon exists', async () => {
      const mockPokemonData = {
        id: 25,
        name: 'pikachu',
        types: [],
        sprites: { front_default: '' },
        height: 4,
        weight: 60,
        abilities: [],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockPokemonData });

      const result = await service.validatePokemon('pikachu');

      expect(result).toBe(true);
    });

    it('should return false when pokemon not found', async () => {
      const error = {
        response: { status: 404 },
      };

      mockedAxios.get.mockRejectedValueOnce(error);

      const result = await service.validatePokemon('invalid-pokemon');

      expect(result).toBe(false);
    });

    it('should return false for other errors', async () => {
      const error = {
        response: { status: 500 },
      };

      mockedAxios.get.mockRejectedValueOnce(error);

      const result = await service.validatePokemon('pikachu');

      expect(result).toBe(false);
    });
  });
});
