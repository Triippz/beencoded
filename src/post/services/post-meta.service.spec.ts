import { Test, TestingModule } from '@nestjs/testing';

import {AppLogger} from "../../shared/logger/logger.service";
import {PostMetaRepository} from "../repositories/post-meta.repository";
import { PostMetaService } from './post-meta.service';

describe('PostMetaService', () => {
  let service: PostMetaService;

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
        PostMetaService,
        { provide: AppLogger, useValue: mockedLogger },
        {
          provide: PostMetaRepository,
          useValue: mockedRepository,
        },
      ],

    }).compile();

    service = module.get<PostMetaService>(PostMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
