import { Test, TestingModule } from '@nestjs/testing';

import {AppLogger} from "../../shared/logger/logger.service";
import {PostService} from "../services/post.service";
import { PostController } from './post.controller';

describe('PostController', () => {
  let controller: PostController;

  const mockedPostService = {
    getPosts: jest.fn(),
    findById: jest.fn(),
    findBySlug: jest.fn(),
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        PostController,
      ],
      providers: [
        { provide: PostService, useValue: mockedPostService },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
