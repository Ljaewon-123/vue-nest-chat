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

    const add = await this.redis.xadd(streamName, '*', ...Object.entries(fieldsToStore).flat() as RedisValue[])
    console.log(add)
    return add
  }

  async readStream({
    streamName,
    blockMs,
    count,
    lastMessageId,
  }: ReadStreamParams) {
    try {

      // const redis = new IORedis()

      // block가 없어도 결과는 null로 값을 가져오지 못해 근본적으로 같다
      // const results = await this.redis.xread("COUNT", count,"BLOCK", blockMs, "STREAMS", streamName, lastMessageId);
      // const results = await this.redis.xread("COUNT", count, "STREAMS", streamName, lastMessageId);
      const results = await this.redisRead.xread("COUNT", count,"BLOCK", blockMs, "STREAMS", streamName, lastMessageId);


      console.log(results)

      const data = results[0][1][0][1];
      const obj = {}


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
// ****** 

// => 정정 근본적으로 클라이언트 때문은 아님 
// => xread는 보통 특정 streamId의 최신 데이터를 읽을때 많이 사용되는데
// => 하나의 redis객체가 xadd와 xread를 모두 한다면 결국 하나가 멈추는데 
// => => 서로 다른 매서드 임에도 xadd와 xread가 모두 this.redis라면 readStream 실행시 xadd가 멈추게된다 
// => 새로운 stream data가 없어서 가져오지 못하는것 block가 > 0 이라면 null을 반환한다 
// 어찌보면 당연했던 수순
// block가 없어도 결과는 null로 값을 가져오지 못해 근본적으로 같다
// ******
// *******************************
// xread 명령은 블로킹(blocking) 방식으로 실행 즉, 데이터가 도착할 때까지 블록되어 대기
// 이때, xread 명령이 실행된 순간에는 Redis 서버에서 
// 스트림에 새로운 데이터가 도착할 때까지 xadd 명령이 일시 중지되고, xread 명령이 완료된 후에 다시 xadd 명령이 실행
//  Redis의 블로킹 명령은 동시에 여러 명령을 실행하는 것을 제한
// 여러스트림 연결등 장점은 존재 
// ********************
// xread가 실행되는순간 xadd의 return값이 실행되지 않는데 
// 이때 xread의 "$"는 그 이후 추가적인 stream이 발생하지 않아 
// 항상 null을 가져오거나 혹은 동작을 멈춘상태로 대기한다 
// block가 0일때 아무런 콘솔이 나오지 않은것은 어떠한 stream도 발생하지 않아서이다
// ************************************************