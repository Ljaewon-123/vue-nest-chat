import { ModuleMetadata, Type } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';

export const IORedisKey = 'IORedis';

export interface RedisModuleOptions  {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'>  {
  name?: string;
  useExisting?: Type<RedisOptionsFactory>;
  useClass?: Type<RedisOptionsFactory>;
  useFactory: ( ...args: any[] ) => Promise<RedisModuleOptions> | RedisModuleOptions
  inject?: any[];

  // imports ?: ModuleMetadata 
  // useFactory: ( ...args: any[] ) => Promise<RedisModuleOptions> | RedisModuleOptions
  // inject ?: FactoryProvider
} 

export interface RedisOptionsFactory {
  createRedisConnectOptions(): Promise<RedisOptions> | RedisOptions;
}