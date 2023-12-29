import { Module } from '@nestjs/common';
import { RedisStreamController } from './redis-stream.controller';
import { RedisStreamService } from './redis-stream.service';
import { StreamHandlerService } from './stream-handler/stream-handler.service';

@Module({
  controllers: [RedisStreamController],
  providers: [RedisStreamService, StreamHandlerService],
  exports:[StreamHandlerService]
})
export class RedisStreamModule {}
