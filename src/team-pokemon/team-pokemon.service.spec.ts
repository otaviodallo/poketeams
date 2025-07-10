import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TeamPokemonService } from './team-pokemon.service';
import { TeamPokemonRepository } from './team-pokemon.repository';
import { PokeApiService } from '../common/poke-api.service';
import { TeamRepository } from '../team/team.repository';
import {
  CreateTeamPokemonDto,
  TeamPokemonResponseDto,
  PokemonResponseDto,
  AddPokemonDto,
} from './dto';

describe('TeamPokemonService', () => {
  let service: TeamPokemonService;
  let teamPokemonRepository: TeamPokemonRepository;
  let pokeApiService: PokeApiService;
  let teamRepository: TeamRepository;

  const mockTeamPokemonRepository = {
    createTeamPokemon: jest.fn(),
    updateTeamPokemon: jest.fn(),
    deleteTeamPokemon: jest.fn(),
    getTeamPokemonById: jest.fn(),
    getPokemonsByTeamId: jest.fn(),
    getTeamPokemonByTeamAndPokemonId: jest.fn(),
    countPokemonsInTeam: jest.fn(),
  };

  const mockPokeApiService = {
    getPokemon: jest.fn(),
    validatePokemon: jest.fn(),
  };

  const mockTeamRepository = {
    getTeamById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamPokemonService,
        {
          provide: TeamPokemonRepository,
          useValue: mockTeamPokemonRepository,
        },
        {
          provide: PokeApiService,
          useValue: mockPokeApiService,
        },
        {
          provide: TeamRepository,
          useValue: mockTeamRepository,
        },
      ],
    }).compile();

    service = module.get<TeamPokemonService>(TeamPokemonService);
    teamPokemonRepository = module.get<TeamPokemonRepository>(
      TeamPokemonRepository,
    );
    pokeApiService = module.get<PokeApiService>(PokeApiService);
    teamRepository = module.get<TeamRepository>(TeamRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTeamPokemon', () => {
    it('should create team pokemon successfully', async () => {
      const createTeamPokemonDto: CreateTeamPokemonDto = {
        teamId: 'team-1',
        pokemonId: 'pikachu',
      };

      const mockTeam = {
        id: 'team-1',
        name: 'Time dos Iniciais',
        trainerId: 'trainer-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockPokemonData = {
        id: 25,
        name: 'pikachu',
        types: ['electric'],
        sprites: { front_default: 'sprite-url' },
        height: 4,
        weight: 60,
        abilities: [],
      };

      const expectedTeamPokemon: TeamPokemonResponseDto = {
        id: 'team-pokemon-1',
        teamId: 'team-1',
        pokemonId: 'pikachu',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTeamRepository.getTeamById.mockResolvedValue(mockTeam);
      mockPokeApiService.getPokemon.mockResolvedValue(mockPokemonData);
      mockTeamPokemonRepository.getTeamPokemonByTeamAndPokemonId.mockResolvedValue(
        null,
      );
      mockTeamPokemonRepository.countPokemonsInTeam.mockResolvedValue(0);
      mockTeamPokemonRepository.createTeamPokemon.mockResolvedValue(
        expectedTeamPokemon,
      );

      const result = await service.createTeamPokemon(createTeamPokemonDto);

      expect(result).toEqual(expectedTeamPokemon);
      expect(teamRepository.getTeamById).toHaveBeenCalledWith('team-1');
      expect(pokeApiService.getPokemon).toHaveBeenCalledWith('pikachu');
    });

    it('should throw error when team not found', async () => {
      const createTeamPokemonDto: CreateTeamPokemonDto = {
        teamId: 'invalid-team',
        pokemonId: 'pikachu',
      };

      mockTeamRepository.getTeamById.mockResolvedValue(null);

      await expect(
        service.createTeamPokemon(createTeamPokemonDto),
      ).rejects.toThrow(
        new HttpException('Time não encontrado', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw error when pokemon already exists in team', async () => {
      const createTeamPokemonDto: CreateTeamPokemonDto = {
        teamId: 'team-1',
        pokemonId: 'pikachu',
      };

      const mockTeam = { id: 'team-1', name: 'Time', trainerId: 'trainer-1' };
      const mockPokemonData = {
        id: 25,
        name: 'pikachu',
        types: [],
        sprites: {},
        height: 4,
        weight: 60,
        abilities: [],
      };
      const existingPokemon = {
        id: 'existing',
        teamId: 'team-1',
        pokemonId: 'pikachu',
      };

      mockTeamRepository.getTeamById.mockResolvedValue(mockTeam);
      mockPokeApiService.getPokemon.mockResolvedValue(mockPokemonData);
      mockTeamPokemonRepository.getTeamPokemonByTeamAndPokemonId.mockResolvedValue(
        existingPokemon,
      );

      await expect(
        service.createTeamPokemon(createTeamPokemonDto),
      ).rejects.toThrow(
        new HttpException('Pokémon já está neste time', HttpStatus.CONFLICT),
      );
    });

    it('should throw error when team has maximum pokemons', async () => {
      const createTeamPokemonDto: CreateTeamPokemonDto = {
        teamId: 'team-1',
        pokemonId: 'pikachu',
      };

      const mockTeam = { id: 'team-1', name: 'Time', trainerId: 'trainer-1' };
      const mockPokemonData = {
        id: 25,
        name: 'pikachu',
        types: [],
        sprites: {},
        height: 4,
        weight: 60,
        abilities: [],
      };

      mockTeamRepository.getTeamById.mockResolvedValue(mockTeam);
      mockPokeApiService.getPokemon.mockResolvedValue(mockPokemonData);
      mockTeamPokemonRepository.getTeamPokemonByTeamAndPokemonId.mockResolvedValue(
        null,
      );
      mockTeamPokemonRepository.countPokemonsInTeam.mockResolvedValue(6);

      await expect(
        service.createTeamPokemon(createTeamPokemonDto),
      ).rejects.toThrow(
        new HttpException(
          'Time já possui o máximo de 6 pokémons',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('addPokemonToTeam', () => {
    it('should add pokemon to team successfully', async () => {
      const teamId = 'team-1';
      const addPokemonDto: AddPokemonDto = {
        pokemonId: 'pikachu',
      };

      const mockTeam = {
        id: 'team-1',
        name: 'Time dos Iniciais',
        trainerId: 'trainer-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockPokemonData = {
        id: 25,
        name: 'pikachu',
        types: ['electric'],
        sprites: { front_default: 'sprite-url' },
        height: 4,
        weight: 60,
        abilities: [],
      };

      const mockTeamPokemon: TeamPokemonResponseDto = {
        id: 'team-pokemon-1',
        teamId: 'team-1',
        pokemonId: 'pikachu',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedPokemonResponse: PokemonResponseDto = {
        id: 'team-pokemon-1',
        pokemonId: 'pikachu',
        name: 'pikachu',
        types: ['electric'],
        sprite: 'sprite-url',
        createdAt: mockTeamPokemon.createdAt,
      };

      mockTeamRepository.getTeamById.mockResolvedValue(mockTeam);
      mockPokeApiService.getPokemon.mockResolvedValue(mockPokemonData);
      mockTeamPokemonRepository.getTeamPokemonByTeamAndPokemonId.mockResolvedValue(
        null,
      );
      mockTeamPokemonRepository.countPokemonsInTeam.mockResolvedValue(0);
      mockTeamPokemonRepository.createTeamPokemon.mockResolvedValue(
        mockTeamPokemon,
      );

      const result = await service.addPokemonToTeam(teamId, addPokemonDto);

      expect(result).toEqual(expectedPokemonResponse);
    });
  });

  describe('removePokemonFromTeam', () => {
    it('should remove pokemon from team successfully', async () => {
      const teamId = 'team-1';
      const pokemonId = 'pikachu';

      const mockTeam = { id: 'team-1', name: 'Time', trainerId: 'trainer-1' };
      const mockTeamPokemon = {
        id: 'team-pokemon-1',
        teamId: 'team-1',
        pokemonId: 'pikachu',
      };

      mockTeamRepository.getTeamById.mockResolvedValue(mockTeam);
      mockTeamPokemonRepository.getTeamPokemonByTeamAndPokemonId.mockResolvedValue(
        mockTeamPokemon,
      );
      mockTeamPokemonRepository.deleteTeamPokemon.mockResolvedValue(undefined);

      await service.removePokemonFromTeam(teamId, pokemonId);

      expect(teamPokemonRepository.deleteTeamPokemon).toHaveBeenCalledWith(
        'team-pokemon-1',
      );
    });

    it('should throw error when pokemon not found in team', async () => {
      const teamId = 'team-1';
      const pokemonId = 'pikachu';

      const mockTeam = { id: 'team-1', name: 'Time', trainerId: 'trainer-1' };

      mockTeamRepository.getTeamById.mockResolvedValue(mockTeam);
      mockTeamPokemonRepository.getTeamPokemonByTeamAndPokemonId.mockResolvedValue(
        null,
      );

      await expect(
        service.removePokemonFromTeam(teamId, pokemonId),
      ).rejects.toThrow(
        new HttpException(
          'Pokémon não encontrado neste time',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('getPokemonsByTeamId', () => {
    it('should return enriched pokemons from team', async () => {
      const teamId = 'team-1';

      const mockTeam = { id: 'team-1', name: 'Time', trainerId: 'trainer-1' };
      const mockTeamPokemons: TeamPokemonResponseDto[] = [
        {
          id: 'team-pokemon-1',
          teamId: 'team-1',
          pokemonId: 'pikachu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockPokemonData = {
        id: 25,
        name: 'pikachu',
        types: ['electric'],
        sprites: { front_default: 'sprite-url' },
        height: 4,
        weight: 60,
        abilities: [],
      };

      const expectedPokemonResponse: PokemonResponseDto[] = [
        {
          id: 'team-pokemon-1',
          pokemonId: 'pikachu',
          name: 'pikachu',
          types: ['electric'],
          sprite: 'sprite-url',
          createdAt: mockTeamPokemons[0].createdAt,
        },
      ];

      mockTeamRepository.getTeamById.mockResolvedValue(mockTeam);
      mockTeamPokemonRepository.getPokemonsByTeamId.mockResolvedValue(
        mockTeamPokemons,
      );
      mockPokeApiService.getPokemon.mockResolvedValue(mockPokemonData);

      const result = await service.getPokemonsByTeamId(teamId);

      expect(result).toEqual(expectedPokemonResponse);
    });

    it('should return basic data when pokemon API fails', async () => {
      const teamId = 'team-1';

      const mockTeam = { id: 'team-1', name: 'Time', trainerId: 'trainer-1' };
      const mockTeamPokemons: TeamPokemonResponseDto[] = [
        {
          id: 'team-pokemon-1',
          teamId: 'team-1',
          pokemonId: 'pikachu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const expectedPokemonResponse: PokemonResponseDto[] = [
        {
          id: 'team-pokemon-1',
          pokemonId: 'pikachu',
          name: 'pikachu',
          types: [],
          sprite: '',
          createdAt: mockTeamPokemons[0].createdAt,
        },
      ];

      mockTeamRepository.getTeamById.mockResolvedValue(mockTeam);
      mockTeamPokemonRepository.getPokemonsByTeamId.mockResolvedValue(
        mockTeamPokemons,
      );
      mockPokeApiService.getPokemon.mockRejectedValue(new Error('API Error'));

      const result = await service.getPokemonsByTeamId(teamId);

      expect(result).toEqual(expectedPokemonResponse);
    });
  });

  describe('countPokemonsInTeam', () => {
    it('should return pokemon count in team', async () => {
      const teamId = 'team-1';
      const expectedCount = 3;

      mockTeamPokemonRepository.countPokemonsInTeam.mockResolvedValue(
        expectedCount,
      );

      const result = await service.countPokemonsInTeam(teamId);

      expect(result).toBe(expectedCount);
      expect(teamPokemonRepository.countPokemonsInTeam).toHaveBeenCalledWith(
        teamId,
      );
    });
  });
});
