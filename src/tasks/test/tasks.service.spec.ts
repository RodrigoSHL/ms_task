import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TasksService } from '../tasks.service';
import { mockTask, mockTaskError } from './Task';

describe('TasksService', () => {
  let service: TasksService;
  let ormMock: Repository<Task>;

  beforeEach(async () => {
    const mockOrmRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockOrmRepository
        }
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    ormMock = module.get(getRepositoryToken(Task));
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new video', async () => {
      jest.spyOn(ormMock, 'create').mockReturnValueOnce(mockTask())

      const response = await service.create({
        name: 'anytitle',
        description: 'anydescription',
        state: 1
      })

      expect(response.id).toBeTruthy();
      expect(response.name).toBe('anytitle');
      expect(response.description).toBe('anydescription');
      expect(response.state).toBe(1);

    })
  })


  describe('findAll()', () => {
    it('should return all task', async () => {
      const mockReturn = [mockTask()]

      jest.spyOn(ormMock, 'find').mockResolvedValueOnce(mockReturn);

      const response = await service.getAll();

      expect(response).toEqual(mockReturn);
    })

    
    it('should return empty array', async () => {
      const mockReturnError = [mockTaskError()]

      jest.spyOn(ormMock, 'find').mockResolvedValueOnce(mockReturnError);

      const response = await service.getAll();
      console.log('response', response)
      expect(response).toEqual(mockReturnError);
    })
  })
});
