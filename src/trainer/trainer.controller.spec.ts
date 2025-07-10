import { Test, TestingModule } from '@nestjs/testing';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto, UpdateTrainerDto, TrainerResponseDto } from './dto';

describe('TrainerController', () => {
  let controller: TrainerController;
  let service: TrainerService;

  const mockTrainerService = {
    createTrainer: jest.fn(),
    updateTrainer: jest.fn(),
    deleteTrainer: jest.fn(),
    getTrainerById: jest.fn(),
    getTrainers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainerController],
      providers: [
        {
          provide: TrainerService,
          useValue: mockTrainerService,
        },
      ],
    }).compile();

    controller = module.get<TrainerController>(TrainerController);
    service = module.get<TrainerService>(TrainerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTrainer', () => {
    it('should create a trainer', async () => {
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

      mockTrainerService.createTrainer.mockResolvedValue(expectedTrainer);

      const result = await controller.createTrainer(createTrainerDto);

      expect(result).toEqual(expectedTrainer);
      expect(service.createTrainer).toHaveBeenCalledWith(createTrainerDto);
    });
  });

  describe('updateTrainer', () => {
    it('should update a trainer', async () => {
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

      mockTrainerService.updateTrainer.mockResolvedValue(expectedTrainer);

      const result = await controller.updateTrainer(
        trainerId,
        updateTrainerDto,
      );

      expect(result).toEqual(expectedTrainer);
      expect(service.updateTrainer).toHaveBeenCalledWith(
        trainerId,
        updateTrainerDto,
      );
    });
  });

  describe('deleteTrainer', () => {
    it('should delete a trainer', async () => {
      const trainerId = 'trainer-1';

      mockTrainerService.deleteTrainer.mockResolvedValue(undefined);

      await controller.deleteTrainer(trainerId);

      expect(service.deleteTrainer).toHaveBeenCalledWith(trainerId);
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

      mockTrainerService.getTrainerById.mockResolvedValue(expectedTrainer);

      const result = await controller.getTrainerById(trainerId);

      expect(result).toEqual(expectedTrainer);
      expect(service.getTrainerById).toHaveBeenCalledWith(trainerId);
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

      mockTrainerService.getTrainers.mockResolvedValue(expectedTrainers);

      const result = await controller.getTrainers();

      expect(result).toEqual(expectedTrainers);
      expect(service.getTrainers).toHaveBeenCalled();
    });
  });
});
