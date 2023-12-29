import { Test, TestingModule } from '@nestjs/testing';
import { StreamHandlerService } from './stream-handler.service';

describe('StreamHandlerService', () => {
  let service: StreamHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamHandlerService],
    }).compile();

    service = module.get<StreamHandlerService>(StreamHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
