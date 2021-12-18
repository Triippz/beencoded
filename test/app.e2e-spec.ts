import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import {
  closeDBAfterTest,
  createDBEntities,
  resetDBBeforeTest,
} from './test-utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await resetDBBeforeTest();
    await createDBEntities();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
    await closeDBAfterTest();
  });
});
