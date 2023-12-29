import { Test, TestingModule } from '@nestjs/testing';
import { RedisStreamController } from './redis-stream.controller';

describe('RedisStreamController', () => {
  let controller: RedisStreamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedisStreamController],
    }).compile();

    controller = module.get<RedisStreamController>(RedisStreamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
