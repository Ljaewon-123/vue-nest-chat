import { Inject, Injectable } from '@nestjs/common';
import { IORedisKey } from 'src/redis/redis.interface';
import IORedis from 'ioredis'
import { RedisStreamService } from '../redis-stream.service';

@Injectable()
export class StreamHandlerService {
  constructor(
    @Inject(IORedisKey) private readonly redis: IORedis,

    private redisService : RedisStreamService
  ){}

  private isAlive = true;

  onModuleDestroy() {
    this.isAlive = false;
  }
  

  addToStream(fieldsToStore: Record<string, any>, streamName: string) {
    return this.redisService.addToStream({ fieldsToStore, streamName });
  }

  readFromStream(streamName:string, count: number) {
    return this.redisService.readStream({
      streamName,
      blockMs: 0, // 0 = infinite blocking until at least one message is fetched, or timeout happens
      count, // max how many messages to fetch at a time
      lastMessageId: '$',
    });
  }

  async *getStreamMessageGenerator(
    streamName: string,
    count: number,
  ) {
    // Start with latest data
    let lastMessageId = '$';
    while (this.isAlive) {
      const response = await this.redisService.readStream({
        streamName,
        blockMs: 0, 
        count, 
        lastMessageId,
      });

      // If no messages returned, continue to next iteration without yielding
      if (!response || response.length === 0) {
        continue;
      }
      // Update last message id to be the last message returned from redis
      lastMessageId = response[response.length - 1]["id"];
      for (const message of response) {
        yield message;
      }
    }
  }

}
