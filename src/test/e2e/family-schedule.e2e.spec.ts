import { Test, TestingModule } from '@nestjs/testing';
import {
  FamilyScheduleService,
  ResponseFamilyScheduleDto,
} from '../../domain/family-schedule';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Family, FamilySchedule } from '../../infra/entities';
import { FamilyScheduleModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('FamilyScheduleController', () => {
  let app: INestApplication;
  let mockFamilyScheduleService: Partial<FamilyScheduleService>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  let mockFamilyScheduleRepository: Partial<Repository<FamilySchedule>>;

  const mockFamily = Family.createFamily('testFamily', 'testKeyCode');
  mockFamily.setId(1);
  const mockFamilySchedule = FamilySchedule.createFamilySchedule(
    'testSchedule',
    new Date(2021, 9, 10),
    mockFamily,
  );

  console.log(mockFamilySchedule.scheduleDate);
  mockFamilySchedule.id = 2;
  beforeEach(async () => {
    mockFamilyScheduleService = {
      createFamilySchedule: jest.fn().mockResolvedValue(1),
      updateFamilySchedule: jest.fn(),
      deleteFamilySchedule: jest.fn(),
      findFamilyScheduleById: jest
        .fn()
        .mockResolvedValue(ResponseFamilyScheduleDto.from(mockFamilySchedule)),
      findFamilyScheduleList: jest
        .fn()
        .mockResolvedValue([
          ResponseFamilyScheduleDto.from(mockFamilySchedule),
        ]),
    };
    mockFamilyScheduleRepository = {
      findOne: jest.fn().mockResolvedValue(mockFamilySchedule),
      find: jest.fn().mockResolvedValue([mockFamilySchedule]),
    };
    mockFamilyRepository = {
      findOne: jest.fn().mockResolvedValue(mockFamily),
      find: jest.fn().mockResolvedValue(mockFamily),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FamilyScheduleModule],
    })
      .overrideProvider(FamilyScheduleService)
      .useValue(mockFamilyScheduleService)
      .overrideProvider(getRepositoryToken(FamilySchedule))
      .useValue(mockFamilyScheduleRepository)
      .overrideProvider(getRepositoryToken(Family))
      .useValue(mockFamilyRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should return familyschedule id with apth: /create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/family-schedule/create')
      .send({
        scheduleName: 'test',
        scheduleDate: '2021-10-10',
        familyId: 1,
      })
      .expect(201);

    expect(response.body.message).toEqual('가족 일정 생성 성공');
    expect(response.body.data).toEqual(1);
  });

  it('should update FamilySchedule with path: /update (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/family-schedule/update')
      .send({
        familyScheduleId: 1,
        scheduleName: 'test',
        scheduleDate: '2021-10-10',
        familyId: 1,
      })
      .expect(200);

    expect(mockFamilyScheduleService.updateFamilySchedule).toBeCalled();
    expect(response.body.message).toEqual('가족 일정 정보 수정 성공');
  });

  it('should delete FamilySchedule with path: /delete/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/family-schedule/delete/1')
      .expect(200);

    expect(mockFamilyScheduleService.deleteFamilySchedule).toBeCalled();
    expect(response.body.message).toEqual('가족 일정 삭제 성공');
  });

  it('should return familyschedule info with path: /:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/family-schedule/get/1')
      .expect(200);

    console.log(response.body);

    expect(response.body.message).toEqual('가족 일정 조회 성공');
    expect(response.body.data.familyId).toEqual(1);
    expect(response.body.data.scheduleId).toEqual(2);
    expect(response.body.data.scheduleName).toEqual('testSchedule');
  });

  it('should return familyschedule list with path: /list/:familyId (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/family-schedule/list/1')
      .expect(200);

    console.log(response.body);

    expect(response.body.message).toEqual('가족 일정 조회 성공');
    expect(response.body.data[0].familyId).toEqual(1);
    expect(response.body.data[0].scheduleId).toEqual(2);
    expect(response.body.data[0].scheduleName).toEqual('testSchedule');
  });
});
