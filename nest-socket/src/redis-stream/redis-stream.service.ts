import { Inject, Injectable } from '@nestjs/common';
import IORedis, { RedisValue } from 'ioredis'
import { IORedisKey } from 'src/redis/redis.interface';
import { AddToStreamParams, ReadStreamParams } from './interface';

@Injectable()
export class RedisStreamService {

  constructor(
    @Inject(IORedisKey) private readonly redis: IORedis,
  ){}

  async addToStream({
    fieldsToStore,
    streamName,
  }: AddToStreamParams): Promise<string> {
    
    const redisValue: RedisValue = JSON.stringify(fieldsToStore)

    return await this.redis.xadd(streamName, '*', redisValue, 'MAXLEN', '~', 10)
  }

  async readStream({
    streamName,
    blockMs,
    count,
    lastMessageId,
  }: ReadStreamParams) {
    try {
      // 1703407605031-0 이건되고 왜 $이거는 not work
      console.log(streamName, lastMessageId)
      const response = await this.redis.xread(
        "COUNT", 10, "BLOCK", 200, "STREAMS",streamName, "$", (err, stream) => {
          console.log(err, stream)
        }
      );

      this.redis.xread('STREAMS', streamName, '$', function(err, stream) {
        if (err) throw err;
        console.log(stream,'ha...');
      });

      console.log(response,'res')

      // const { messages } = response?.[0]; // returning first stream (since only 1 stream used)

      return response || null;
    } catch (error) {
      // if (error instanceof ClientClosedError) {
      //   console.log(`${error.message} ...RECONNECTING`);
      //   await this.connectToRedis();
      //   return null;
      // }
      // console.error(
      //   `Failed to xRead from Redis Stream: ${error.message}`,
      //   error,
      // );
      // return null;
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
