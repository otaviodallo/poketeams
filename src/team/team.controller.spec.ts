import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto, TeamResponseDto } from './dto';

describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;

  const mockTeamService = {
    createTeam: jest.fn(),
    updateTeam: jest.fn(),
    deleteTeam: jest.fn(),
    getTeamById: jest.fn(),
    getTeams: jest.fn(),
    getTeamByTrainerId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: mockTeamService,
        },
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTeam', () => {
    it('should create a team', async () => {
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

      mockTeamService.createTeam.mockResolvedValue(expectedTeam);

      const result = await controller.createTeam(createTeamDto);

      expect(result).toEqual(expectedTeam);
      expect(service.createTeam).toHaveBeenCalledWith(createTeamDto);
    });
  });

  describe('updateTeam', () => {
    it('should update a team', async () => {
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

      mockTeamService.updateTeam.mockResolvedValue(expectedTeam);

      const result = await controller.updateTeam(teamId, updateTeamDto);

      expect(result).toEqual(expectedTeam);
      expect(service.updateTeam).toHaveBeenCalledWith(teamId, updateTeamDto);
    });
  });

  describe('deleteTeam', () => {
    it('should delete a team', async () => {
      const teamId = 'team-1';

      mockTeamService.deleteTeam.mockResolvedValue(undefined);

      await controller.deleteTeam(teamId);

      expect(service.deleteTeam).toHaveBeenCalledWith(teamId);
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

      mockTeamService.getTeamById.mockResolvedValue(expectedTeam);

      const result = await controller.getTeamById(teamId);

      expect(result).toEqual(expectedTeam);
      expect(service.getTeamById).toHaveBeenCalledWith(teamId);
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

      mockTeamService.getTeams.mockResolvedValue(expectedTeams);

      const result = await controller.getTeams();

      expect(result).toEqual(expectedTeams);
      expect(service.getTeams).toHaveBeenCalled();
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

      mockTeamService.getTeamByTrainerId.mockResolvedValue(expectedTeams);

      const result = await controller.getTeamByTrainerId(trainerId);

      expect(result).toEqual(expectedTeams);
      expect(service.getTeamByTrainerId).toHaveBeenCalledWith(trainerId);
    });
  });
});
