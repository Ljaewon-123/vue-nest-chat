import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { IORedisKey, RedisModuleAsyncOptions } from "./redis.interface";
import IORedis from 'ioredis';


@Global()
@Module({})
export class RedisModule {
  static registerAsync({
    useFactory,
    imports,
    inject,
  }: RedisModuleAsyncOptions): DynamicModule {
    const redisProvider: Provider = {
      provide: IORedisKey,
      useFactory: async (...args) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);

        const client = new IORedis(connectionOptions);

        onClientReady(client);

        return client;
      },
      inject: inject,
    };

    return {
      module: RedisModule,
      imports,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
