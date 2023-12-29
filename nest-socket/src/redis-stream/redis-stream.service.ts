import { Inject, Injectable } from '@nestjs/common';
import IORedis, { Redis, RedisValue } from 'ioredis'
import { IORedisKey, IORedisRead } from 'src/redis/redis.interface';
import { AddToStreamParams, ReadStreamParams } from './interface';

@Injectable()
export class RedisStreamService {

  constructor(
    @Inject(IORedisKey) private readonly redis: IORedis,
    @Inject(IORedisRead) private readonly redisRead: IORedis,
  ){}

  async addToStream({
    fieldsToStore,
    streamName,
  }: AddToStreamParams) {
    

    for (const key in fieldsToStore) {
      if (typeof fieldsToStore[key] == 'object') fieldsToStore[key] = JSON.stringify(fieldsToStore[key])

      else fieldsToStore[key] = String(fieldsToStore[key])
    }

    return await this.redis.xadd(streamName, '*', ...Object.entries(fieldsToStore).flat() as RedisValue[])
  }

  async readStream({
    streamName,
    blockMs,
    count,
    lastMessageId,
  }: ReadStreamParams) {
    try {

      // const redis = new IORedis()

      const results = await this.redisRead.xread("COUNT", count,"BLOCK", blockMs, "STREAMS", streamName, lastMessageId);
      const data = results[0][1][0][1];
      const obj = {}

      console.log(results)

      // for (let i = 0; i < data.length; i += 2) {
      //   const key = data[i];
      //   const value = data[i + 1]

      //   obj[key] = value
      // }

      return results

    } catch (error) {
      console.log(error,'?error')
    }
  }

  private async connectToRedis() {
    try {
      console.log(this.redis.status, 'status')
      // Try to reconnect only if the connection socket is closed. Else let it be handled by reconnect strategy.
      if (this.redis.status != 'connect' ) {
        await this.redis.connect();
      }
    } catch (error) {
      console.error(
        `[${error.name}] ${error.message}`,
        error,
      );
    }
  }


}


// *******************************************
// xrange는 똑같은 클라이언트로 xadd와 xrange읽기 모두 처리할수있지만
// xadd와 xread는 서로 다른 별개의 클라이언트를 사용해야한다 
// xread가 실행되는순간 xadd의 return값이 실행되지 않는데 
// 이때 xread의 "$"는 그 이후 추가적인 stream이 발생하지 않아 
// 항상 null을 가져오거나 혹은 동작을 멈춘상태로 대기한다 
// block가 0일때 아무런 콘솔이 나오지 않은것은 어떠한 stream도 발생하지 않아서이다
// ************************************************