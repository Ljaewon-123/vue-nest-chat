import { Injectable } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {

  constructor(
    private chatGateway : ChatGateway
  ){}
  

  joinRooms(roomName: string){
    this.chatGateway.server.socketsJoin(roomName)
  }

}
