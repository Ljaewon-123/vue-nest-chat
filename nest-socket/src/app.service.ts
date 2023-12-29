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
      const a = await this.streamService.addToStream(
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

  async getMultipleNewMessages(count: number) {
    const generator = this.streamService.getStreamMessageGenerator(
      this.EXAMPLE_STREAM_NAME,
      count,
    );
    const messages: Record<string, string>[] = [];
    let counter = 0;
    for await (const messageObj of generator) {
      messages.push(this.parseMessage(messageObj['message']));
      counter++;
      if (counter >= count) {
        break;
      }
    }
    return messages;
  }

  private parseMessage(message: Record<string, string>) {
    return Object.entries(message).reduce((acc, [key, value]) => {
      try{
      acc[key] = JSON.parse(value);
      }catch(e){
        acc[key] =value
      }
      return acc;
    }, {});
  }

  // private async continuousReadMessages() {
  //   const generator = this.streamService.getStreamMessageGenerator(
  //     this.EXAMPLE_STREAM_NAME,
  //     3,
  //   );
  //   for await (const messageObj of generator) {
  //     console.log(
  //       `Got message with ID: ${messageObj.id}`,
  //       JSON.stringify(this.parseMessage(messageObj.message), undefined, 2),
  //     );
  //     if (!this.isAlive) {
  //       break;
  //     }
  //   }
  // }

}
