import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';

// 80, {namespace: 'chat'}
@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
  
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
  handleMessage(@MessageBody() message: string) {

    console.log(message)

    this.server.emit('response', message)
  }


}


// 서버? 소캣? 모두에게 전송 
// 특정 룸에만 전송  // 제일중요함 
// 모든 유전에게 전송