import { Inject, Injectable } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { IORedisKey } from 'src/redis/redis.interface';

@Injectable()
export class ChatService {

  constructor(
    private chatGateway : ChatGateway,

    
  ){}
  
  // 항상 보내는게 맞는 건지 필요할때만 가져오는게 맞는건지 생각하기
  // http로 모든 roomlist가져오기 
  async getRooms(){

    const rooms = await (this.chatGateway.server.adapter as any).rooms
    const allRooms = Array.from(rooms.keys()).filter( (room: string) => room.length < 20)
    
    if(allRooms.length == 0) return []


    return allRooms.map( roomName => ({ roomName }))
  }

}
