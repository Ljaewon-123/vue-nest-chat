import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { RedisStreamModule } from './redis-stream/redis-stream.module';
import { redisModule } from './redis/modules.config';
import { APP_FILTER } from '@nestjs/core';
import { WsFilter } from './filter/ws.filter';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`,
    }),
    ChatModule,
    redisModule,
    RedisStreamModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // socket관련에서만 사용하니 gateway상위가 더 좋다 판단.
    // {
    //   provide: APP_FILTER,
    //   useClass: WsFilter,
    // },
  ],
})
export class AppModule {}
