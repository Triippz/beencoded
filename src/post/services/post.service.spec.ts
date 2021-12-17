import { Test, TestingModule } from '@nestjs/testing';

import {AppLogger} from "../../shared/logger/logger.service";
import {PostRepository} from "../repositories/post.repository";
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

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
        PostService,
        { provide: AppLogger, useValue: mockedLogger },
        {
          provide: PostRepository,
          useValue: mockedRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
