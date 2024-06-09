import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Test app E2E', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should login correctly', async () => {
    const payload = {
      username: 'admin@gmail.com',
      password: 'admin1234',
    };

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload)
      .expect(200);
  });

  it('Should get unauthorized when login with invalid credentials', async () => {
    const payload = {
      username: 'wrong@gmail.com',
      password: 'wrong1234',
    };

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload)
      .expect(401);
  });
});
