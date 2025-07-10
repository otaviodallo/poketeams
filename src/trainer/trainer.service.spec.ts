import { Test, TestingModule } from '@nestjs/testing';
import { TrainerService } from './trainer.service';
import { TrainerRepository } from './trainer.repository';
import { CreateTrainerDto, UpdateTrainerDto, TrainerResponseDto } from './dto';

describe('TrainerService', () => {
  let service: TrainerService;
  let repository: TrainerRepository;

  const mockTrainerRepository = {
    createTrainer: jest.fn(),
    updateTrainer: jest.fn(),
    deleteTrainer: jest.fn(),
    getTrainerById: jest.fn(),
    getTrainers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainerService,
        {
          provide: TrainerRepository,
          useValue: mockTrainerRepository,
        },
      ],
    }).compile();

    service = module.get<TrainerService>(TrainerService);
    repository = module.get<TrainerRepository>(TrainerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTrainer', () => {
    it('should create a trainer successfully', async () => {
      const createTrainerDto: CreateTrainerDto = {
        name: 'Ash Ketchum',
        city: 'Pallet Town',
      };

      const expectedTrainer: TrainerResponseDto = {
        id: 'trainer-1',
        name: 'Ash Ketchum',
        city: 'Pallet Town',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTrainerRepository.createTrainer.mockResolvedValue(expectedTrainer);

      const result = await service.createTrainer(createTrainerDto);

      expect(result).toEqual(expectedTrainer);
      expect(repository.createTrainer).toHaveBeenCalledWith(createTrainerDto);
    });
  });

  describe('updateTrainer', () => {
    it('should update a trainer successfully', async () => {
      const trainerId = 'trainer-1';
      const updateTrainerDto: UpdateTrainerDto = {
        name: 'Ash Ketchum Updated',
        city: 'New Pallet Town',
      };

      const expectedTrainer: TrainerResponseDto = {
        id: trainerId,
        name: 'Ash Ketchum Updated',
        city: 'New Pallet Town',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTrainerRepository.updateTrainer.mockResolvedValue(expectedTrainer);

      const result = await service.updateTrainer(trainerId, updateTrainerDto);

      expect(result).toEqual(expectedTrainer);
      expect(repository.updateTrainer).toHaveBeenCalledWith(
        trainerId,
        updateTrainerDto,
      );
    });
  });

  describe('deleteTrainer', () => {
    it('should delete a trainer successfully', async () => {
      const trainerId = 'trainer-1';

      mockTrainerRepository.deleteTrainer.mockResolvedValue(undefined);

      await service.deleteTrainer(trainerId);

      expect(repository.deleteTrainer).toHaveBeenCalledWith(trainerId);
    });
  });

  describe('getTrainerById', () => {
    it('should return a trainer by id', async () => {
      const trainerId = 'trainer-1';
      const expectedTrainer: TrainerResponseDto = {
        id: trainerId,
        name: 'Ash Ketchum',
        city: 'Pallet Town',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTrainerRepository.getTrainerById.mockResolvedValue(expectedTrainer);

      const result = await service.getTrainerById(trainerId);

      expect(result).toEqual(expectedTrainer);
      expect(repository.getTrainerById).toHaveBeenCalledWith(trainerId);
    });
  });

  describe('getTrainers', () => {
    it('should return all trainers', async () => {
      const expectedTrainers: TrainerResponseDto[] = [
        {
          id: 'trainer-1',
          name: 'Ash Ketchum',
          city: 'Pallet Town',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'trainer-2',
          name: 'Misty',
          city: 'Cerulean City',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockTrainerRepository.getTrainers.mockResolvedValue(expectedTrainers);

      const result = await service.getTrainers();

      expect(result).toEqual(expectedTrainers);
      expect(repository.getTrainers).toHaveBeenCalled();
    });
  });
});
