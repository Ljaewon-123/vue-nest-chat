import { Controller, Inject } from '@nestjs/common';
import IORedis from 'ioredis'
import { IORedisKey } from 'src/redis/redis.interface';
import { RedisStreamService } from './redis-stream.service';

@Controller('redis-stream')
export class RedisStreamController {

  constructor(
    private redisStreamService: RedisStreamService
  ){}



}
