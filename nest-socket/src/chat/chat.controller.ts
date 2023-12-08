import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Controller('chat')
export class ChatController {

  constructor(
    private chatService: ChatService,
  ){}

  @Post('join')
  joinRooms(@Body('roomName') roomName :string){
    this.chatService.joinRooms(roomName)
  }


}
