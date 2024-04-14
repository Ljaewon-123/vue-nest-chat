import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { BaseWsExceptionFilter, ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WsFilter } from 'src/filter/ws.filter';
import { GatewayAuthGuard } from 'src/guard/gateway-auth.guard';

// 80, {namespace: 'chat'}
@UseFilters(WsFilter)
@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
  private clientIntervals: Map<string, NodeJS.Timeout> = new Map();
  private logger: Logger = new Logger(ChatGateway.name)
  private testToken = "Token"
  
  // 서버에서 공통적으로 socket작업할때 # 기본 플랫폼별 서버 인스턴스 
  @WebSocketServer() server: Server

  startSendingData(client: Socket) {
    const interval = setInterval(async() => {

      const rooms = await (this.server.adapter as any).rooms
      const allRooms = Array.from(rooms.keys()).filter( (room: string) => room.length < 20)

      client.emit('allRooms', allRooms.map( roomName => ({ roomName }))); 
    }, 1000);

    this.clientIntervals.set(client.id, interval)
  }

  stopSendingData(client: Socket) {
    const interval = this.clientIntervals.get(client.id);
    if (interval) {
      clearInterval(interval)
      this.clientIntervals.delete(client.id)
    }
  }

  
  afterInit(server: Server) {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
    this.startSendingData(client)
  }

  isValid(token:string){
    return token == this.testToken ? true : false
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
    this.stopSendingData(client)
  }

  @UseGuards(GatewayAuthGuard)
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: { userName:string, value:string },  @ConnectedSocket() client: Socket) {
    
    // console.log(client.rooms)

    // nestjs 기능사용으로 변경 
    // client.use((socket, next) => {
  
    //   const token = client.handshake.auth.token;
    //   console.log(this.isValid(token))
  
    //   if (this.isValid(token)) {
    //     console.log('pass')
    //     next();
    //   } else {
    //     next(new Error("invalid"));
    //   }
    // })
    
    const arrayRoom = Array.from(client.rooms)
    const currentRoom = arrayRoom.find(room => room !== client.id);
    
    // console.log(message, 'message')
    // console.log(currentRoom)

    this.server.to(currentRoom).emit('response', message)
    // this.server.emit('response', message)
  }

  @UseGuards(GatewayAuthGuard)
  @SubscribeMessage('joinRoom')
  enterRoom(@MessageBody('roomName') roomName: string, @MessageBody('name') user:string ,@ConnectedSocket() client: Socket) {

    client.join(roomName)

    // console.log(client.rooms)
    // console.log(user)

    // console.log((this.server.adapter as any).rooms)
    this.server.to(roomName).emit('welcome', {userName:'Welcome', value:`user ${user} has join the room`})
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@MessageBody('roomName') roomName: string, @MessageBody('name') user:string, @ConnectedSocket() client: Socket){
    client.leave(roomName) // room name으로 나가네 

    this.server.to(roomName).emit('welcome', {userName:'goodbye', value:`user ${user} has left the room`})
  }

}

