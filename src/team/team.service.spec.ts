import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { CreateTeamDto, UpdateTeamDto, TeamResponseDto } from './dto';

describe('TeamService', () => {
  let service: TeamService;
  let repository: TeamRepository;

  const mockTeamRepository = {
    createTeam: jest.fn(),
    updateTeam: jest.fn(),
    deleteTeam: jest.fn(),
    getTeamById: jest.fn(),
    getTeams: jest.fn(),
    getTeamByTrainerId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: TeamRepository,
          useValue: mockTeamRepository,
        },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
    repository = module.get<TeamRepository>(TeamRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTeam', () => {
    it('should create a team successfully', async () => {
      const createTeamDto: CreateTeamDto = {
        name: 'Time dos Iniciais',
        trainerId: 'trainer-1',
      };

      const expectedTeam: TeamResponseDto = {
        id: 'team-1',
        name: 'Time dos Iniciais',
        trainerId: 'trainer-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTeamRepository.createTeam.mockResolvedValue(expectedTeam);

      const result = await service.createTeam(createTeamDto);

      expect(result).toEqual(expectedTeam);
      expect(repository.createTeam).toHaveBeenCalledWith(createTeamDto);
    });
  });

  describe('updateTeam', () => {
    it('should update a team successfully', async () => {
      const teamId = 'team-1';
      const updateTeamDto: UpdateTeamDto = {
        name: 'Time dos Iniciais Updated',
      };

      const expectedTeam: TeamResponseDto = {
        id: teamId,
        name: 'Time dos Iniciais Updated',
        trainerId: 'trainer-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTeamRepository.updateTeam.mockResolvedValue(expectedTeam);

      const result = await service.updateTeam(teamId, updateTeamDto);

      expect(result).toEqual(expectedTeam);
      expect(repository.updateTeam).toHaveBeenCalledWith(teamId, updateTeamDto);
    });
  });

  describe('deleteTeam', () => {
    it('should delete a team successfully', async () => {
      const teamId = 'team-1';

      mockTeamRepository.deleteTeam.mockResolvedValue(undefined);

      await service.deleteTeam(teamId);

      expect(repository.deleteTeam).toHaveBeenCalledWith(teamId);
    });
  });

  describe('getTeamById', () => {
    it('should return a team by id', async () => {
      const teamId = 'team-1';
      const expectedTeam: TeamResponseDto = {
        id: teamId,
        name: 'Time dos Iniciais',
        trainerId: 'trainer-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTeamRepository.getTeamById.mockResolvedValue(expectedTeam);

      const result = await service.getTeamById(teamId);

      expect(result).toEqual(expectedTeam);
      expect(repository.getTeamById).toHaveBeenCalledWith(teamId);
    });
  });

  describe('getTeams', () => {
    it('should return all teams', async () => {
      const expectedTeams: TeamResponseDto[] = [
        {
          id: 'team-1',
          name: 'Time dos Iniciais',
          trainerId: 'trainer-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'team-2',
          name: 'Time da Água',
          trainerId: 'trainer-2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockTeamRepository.getTeams.mockResolvedValue(expectedTeams);

      const result = await service.getTeams();

      expect(result).toEqual(expectedTeams);
      expect(repository.getTeams).toHaveBeenCalled();
    });
  });

  describe('getTeamByTrainerId', () => {
    it('should return teams by trainer id', async () => {
      const trainerId = 'trainer-1';
      const expectedTeams: TeamResponseDto[] = [
        {
          id: 'team-1',
          name: 'Time dos Iniciais',
          trainerId: trainerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'team-2',
          name: 'Time Reserva',
          trainerId: trainerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockTeamRepository.getTeamByTrainerId.mockResolvedValue(expectedTeams);

      const result = await service.getTeamByTrainerId(trainerId);

      expect(result).toEqual(expectedTeams);
      expect(repository.getTeamByTrainerId).toHaveBeenCalledWith(trainerId);
    });
  });
});
