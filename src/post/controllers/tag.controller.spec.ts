import { Test, TestingModule } from '@nestjs/testing';

import {AppLogger} from "../../shared/logger/logger.service";
import {TagService} from "../services/tag.service";
import { TagController } from './tag.controller';

describe('TagController', () => {
  let controller: TagController;

  const mockedTagService = {
    getTags: jest.fn(),
    findById: jest.fn(),
    findBySlug: jest.fn(),
  };
  
  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        { provide: TagService, useValue: mockedTagService },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
