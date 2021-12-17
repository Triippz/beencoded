import { Test, TestingModule } from '@nestjs/testing';

import {AppLogger} from "../../shared/logger/logger.service";
import {TagRepository} from "../repositories/tag.repository";
import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;

  const mockedRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    getById: jest.fn(),
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        { provide: AppLogger, useValue: mockedLogger },
        {
          provide: TagRepository,
          useValue: mockedRepository,
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
