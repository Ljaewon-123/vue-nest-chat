import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

describe('ChatService', () => {
  let service: ChatService;
  let gateway: ChatGateway

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, ChatGateway],
    }).compile();

    service = module.get<ChatService>(ChatService);
    gateway = module.get<ChatGateway>(ChatGateway)
  });

  it('should be defined Chat Service', () => {
    expect(service).toBeDefined();
  });

  describe('getRooms', () => {
    it('should return rooms with names less than 20 characters', async () => {
    // Mocking the server adapter's rooms property
    const mockAdapter = { rooms: new Map<string, any>([['room1', {}], ['room2', {}], ['room3toolongname', {}]]) }
    gateway.server = { adapter: mockAdapter } as any

    const result = await service.getRooms()

    // Expectation: only rooms with names less than 20 characters should be returned
    expect(result).toEqual([ { roomName: 'room1' }, { roomName: 'room2' }, { roomName: 'room3toolongname' }])
  });

  // [ { roomName: '모' } ]

  it('should return an empty array if no rooms are found', async() => {
    // Mocking the server adapter's rooms property to return an empty Map
    const mockAdapter = { rooms: new Map<string, any>() }
    gateway.server = { adapter: mockAdapter } as any

    const result = await service.getRooms()

    // Expectation: an empty array should be returned
    expect(result).toEqual([])
  });
  })
});
