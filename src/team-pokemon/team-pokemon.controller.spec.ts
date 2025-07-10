import { Test, TestingModule } from '@nestjs/testing';
import { TeamPokemonController } from './team-pokemon.controller';
import { TeamPokemonService } from './team-pokemon.service';
import {
  CreateTeamPokemonDto,
  UpdateTeamPokemonDto,
  TeamPokemonResponseDto,
  PokemonResponseDto,
  AddPokemonDto,
} from './dto';

describe('TeamPokemonController', () => {
  let controller: TeamPokemonController;
  let service: TeamPokemonService;

  const mockTeamPokemonService = {
    createTeamPokemon: jest.fn(),
    updateTeamPokemon: jest.fn(),
    deleteTeamPokemon: jest.fn(),
    getTeamPokemonById: jest.fn(),
    countPokemonsInTeam: jest.fn(),
    addPokemonToTeam: jest.fn(),
    removePokemonFromTeam: jest.fn(),
    getPokemonsByTeamId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamPokemonController],
      providers: [
        {
          provide: TeamPokemonService,
          useValue: mockTeamPokemonService,
        },
      ],
    }).compile();

    controller = module.get<TeamPokemonController>(TeamPokemonController);
    service = module.get<TeamPokemonService>(TeamPokemonService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTeamPokemon', () => {
    it('should create a team pokemon', async () => {
      const createTeamPokemonDto: CreateTeamPokemonDto = {
        teamId: 'team-1',
        pokemonId: 'pikachu',
      };

      const expectedTeamPokemon: TeamPokemonResponseDto = {
        id: 'team-pokemon-1',
        teamId: 'team-1',
        pokemonId: 'pikachu',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTeamPokemonService.createTeamPokemon.mockResolvedValue(
        expectedTeamPokemon,
      );

      const result = await controller.createTeamPokemon(createTeamPokemonDto);

      expect(result).toEqual(expectedTeamPokemon);
      expect(service.createTeamPokemon).toHaveBeenCalledWith(
        createTeamPokemonDto,
      );
    });
  });

  describe('updateTeamPokemon', () => {
    it('should update a team pokemon', async () => {
      const teamPokemonId = 'team-pokemon-1';
      const updateTeamPokemonDto: UpdateTeamPokemonDto = {
        pokemonId: 'raichu',
      };

      const expectedTeamPokemon: TeamPokemonResponseDto = {
        id: teamPokemonId,
        teamId: 'team-1',
        pokemonId: 'raichu',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTeamPokemonService.updateTeamPokemon.mockResolvedValue(
        expectedTeamPokemon,
      );

      const result = await controller.updateTeamPokemon(
        teamPokemonId,
        updateTeamPokemonDto,
      );

      expect(result).toEqual(expectedTeamPokemon);
      expect(service.updateTeamPokemon).toHaveBeenCalledWith(
        teamPokemonId,
        updateTeamPokemonDto,
      );
    });
  });

  describe('deleteTeamPokemon', () => {
    it('should delete a team pokemon', async () => {
      const teamPokemonId = 'team-pokemon-1';

      mockTeamPokemonService.deleteTeamPokemon.mockResolvedValue(undefined);

      await controller.deleteTeamPokemon(teamPokemonId);

      expect(service.deleteTeamPokemon).toHaveBeenCalledWith(teamPokemonId);
    });
  });

  describe('getTeamPokemonById', () => {
    it('should return a team pokemon by id', async () => {
      const teamPokemonId = 'team-pokemon-1';
      const expectedTeamPokemon: TeamPokemonResponseDto = {
        id: teamPokemonId,
        teamId: 'team-1',
        pokemonId: 'pikachu',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTeamPokemonService.getTeamPokemonById.mockResolvedValue(
        expectedTeamPokemon,
      );

      const result = await controller.getTeamPokemonById(teamPokemonId);

      expect(result).toEqual(expectedTeamPokemon);
      expect(service.getTeamPokemonById).toHaveBeenCalledWith(teamPokemonId);
    });
  });

  describe('countPokemonsInTeam', () => {
    it('should return pokemon count in team', async () => {
      const teamId = 'team-1';
      const expectedCount = 3;

      mockTeamPokemonService.countPokemonsInTeam.mockResolvedValue(
        expectedCount,
      );

      const result = await controller.countPokemonsInTeam(teamId);

      expect(result).toBe(expectedCount);
      expect(service.countPokemonsInTeam).toHaveBeenCalledWith(teamId);
    });
  });

  describe('addPokemonToTeam', () => {
    it('should add pokemon to team', async () => {
      const teamId = 'team-1';
      const addPokemonDto: AddPokemonDto = {
        pokemonId: 'pikachu',
      };

      const expectedPokemonResponse: PokemonResponseDto = {
        id: 'team-pokemon-1',
        pokemonId: 'pikachu',
        name: 'pikachu',
        types: ['electric'],
        sprite: 'sprite-url',
        createdAt: new Date(),
      };

      mockTeamPokemonService.addPokemonToTeam.mockResolvedValue(
        expectedPokemonResponse,
      );

      const result = await controller.addPokemonToTeam(teamId, addPokemonDto);

      expect(result).toEqual(expectedPokemonResponse);
      expect(service.addPokemonToTeam).toHaveBeenCalledWith(
        teamId,
        addPokemonDto,
      );
    });
  });

  describe('removePokemonFromTeam', () => {
    it('should remove pokemon from team', async () => {
      const teamId = 'team-1';
      const pokemonId = 'pikachu';

      mockTeamPokemonService.removePokemonFromTeam.mockResolvedValue(undefined);

      await controller.removePokemonFromTeam(teamId, pokemonId);

      expect(service.removePokemonFromTeam).toHaveBeenCalledWith(
        teamId,
        pokemonId,
      );
    });
  });

  describe('getPokemonsByTeamId', () => {
    it('should return pokemons from team', async () => {
      const teamId = 'team-1';
      const expectedPokemonResponses: PokemonResponseDto[] = [
        {
          id: 'team-pokemon-1',
          pokemonId: 'pikachu',
          name: 'pikachu',
          types: ['electric'],
          sprite: 'sprite-url',
          createdAt: new Date(),
        },
        {
          id: 'team-pokemon-2',
          pokemonId: 'charizard',
          name: 'charizard',
          types: ['fire', 'flying'],
          sprite: 'sprite-url-2',
          createdAt: new Date(),
        },
      ];

      mockTeamPokemonService.getPokemonsByTeamId.mockResolvedValue(
        expectedPokemonResponses,
      );

      const result = await controller.getPokemonsByTeamId(teamId);

      expect(result).toEqual(expectedPokemonResponses);
      expect(service.getPokemonsByTeamId).toHaveBeenCalledWith(teamId);
    });
  });
});
