import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from '../src/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Task } from '../src/tasks/entities/task.entity';
import { ConfigModule } from '@nestjs/config';

describe('Videos', () => {
  let app:INestApplication;
  let repository: Repository<Task>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test'
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          autoLoadEntities: true,
          synchronize: true
      
        }),
        TasksModule
      ]
    }).compile();

    repository = getRepository(Task);

    app = moduleRef.createNestApplication();
    await app.init();
  })

  beforeEach(async () => {
    await repository.delete({});
  })

  afterAll(async () => {
    await app.close();
  })

  test('/GET tasks', async () => {
    const task = repository.create({
      name: 'anytitle',
      description: 'anyurl',
      state: 1
    })

    await repository.save(task);

    const response = await request(app.getHttpServer()).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    console.log(response.body)
    expect(response.body[0].name).toBe('anytitle');
    expect(response.body[0].description).toBe('anyurl');
    expect(response.body[0].state).toBe(1);

  })

  test('/POST videos', async () => {
    const response = await request(app.getHttpServer()).post('/tasks').send({
      name: 'anytitle',
      description: 'anyurl',
      state: 1
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBe('anytitle');
    expect(response.body.description).toBe('anyurl')
    expect(response.body.state).toBe(1)
  })
})