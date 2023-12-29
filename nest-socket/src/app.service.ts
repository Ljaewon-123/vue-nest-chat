import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { StreamHandlerService } from './redis-stream/stream-handler/stream-handler.service';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  private interval: NodeJS.Timeout
  EXAMPLE_STREAM_NAME = 'mystream'

  private logger : Logger

  constructor(
    private streamService: StreamHandlerService
  ){}

  async onModuleInit() {
    this.populateStream();
  }

  onModuleDestroy() {
    this.logger.log('exit')
    clearInterval(this.interval);
  }

  private populateStream() {
    this.interval = setInterval(async () => {
      await this.streamService.addToStream(
        {
          hello: 'world',
          date: new Date(),
          nestedObj: { num: Date.now() % 100 },
        },
        this.EXAMPLE_STREAM_NAME,
        );
    }, 1000);
  }

  getSingleNewMessage() {
    return this.streamService.readFromStream(this.EXAMPLE_STREAM_NAME, 1);
  }


}
