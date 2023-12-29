import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('message')
  getMessage() {
    // return this.appService.getSingleNewMessage()

    return this.appService.getMultipleNewMessages(3);
  }
}
