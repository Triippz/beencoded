import { Test, TestingModule } from '@nestjs/testing';

import {AppLogger} from "../../shared/logger/logger.service";
import {PostMetaService} from "../services/post-meta.service";
import { PostMetaController } from './post-meta.controller';

describe('PostMetaController', () => {
  let controller: PostMetaController;

  const mockedPostMetaService = {
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostMetaController],
      providers: [
        { provide: PostMetaService, useValue: mockedPostMetaService },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    controller = module.get<PostMetaController>(PostMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
