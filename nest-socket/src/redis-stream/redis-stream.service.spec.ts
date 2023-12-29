import { Test, TestingModule } from '@nestjs/testing';
import { RedisStreamService } from './redis-stream.service';

describe('RedisStreamService', () => {
  let service: RedisStreamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisStreamService],
    }).compile();

    service = module.get<RedisStreamService>(RedisStreamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
