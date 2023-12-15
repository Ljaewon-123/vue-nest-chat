import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Controller('chat')
export class ChatController {

  constructor(
    private chatService: ChatService,
  ){}

  @Get('rooms')
  async getRooms(){
    const rooms = await this.chatService.getRooms()

    return rooms
  }

}
