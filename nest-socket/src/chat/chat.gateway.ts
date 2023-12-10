import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';

// 80, {namespace: 'chat'}
@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
  
  // 서버에서 공통적으로 socket작업할때 
  @WebSocketServer() server: Server

  private logger: Logger = new Logger(ChatGateway.name)
  
  afterInit(server: Server) {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string,  @ConnectedSocket() client: Socket,) {

    console.log(message)

    // client.emit('response', message)
    return message
    // this.server.emit('response', message)
  }

  @SubscribeMessage('enter_room')
  enterRoom(@MessageBody() roomName: string,  @ConnectedSocket() client: Socket,) {

    client.join(roomName)

    return roomName
  }


}


// 서버? 소캣? 모두에게 전송 
// 특정 룸에만 전송  // 제일중요함 
// 모든 유전에게 전송