import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ChatGateway } from './../src/chat/chat.gateway';
import { Server, type Socket as ServerSocket } from "socket.io";
import { createServer } from 'http';
import { AddressInfo } from 'net';
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";

function waitFor(socket: Server | ClientSocket, event: string) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let gateway: ChatGateway

  let serverIo: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // app.get() 굳이 gateway에서 안가지고 와도 되네?? e2e라 그런건가??
    gateway = app.get<ChatGateway>(ChatGateway)

    const httpServer = createServer();
    // const io = new Server(httpServer);

    clientSocket = ioc(`http://localhost:${5173}`);  // 클라를 만들어 줘야함.. 
  

  });

  afterAll( done => {
    gateway.server.disconnectSockets();
    clientSocket.disconnect();
    done()
  })

  test("should work", () => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toEqual("world");
    });
    gateway.server.emit("hello", "world");
  });

  test("should work with an acknowledgement", () => {
    gateway.server.on("hi", (cb) => {
      cb("hola"); // 매서드를 보내서 매서드인듯 데이터를 체크하는 매서드를 보냄 
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toEqual("hola");
    });
  });

  // test("should work with emitWithAck()", async () => {
  //   gateway.server.on("foo", (cb) => {
  //     cb("bar");
  //   });
  //   const result = await clientSocket.emitWithAck("foo");
  //   expect(result).toEqual("bar");
  // }, 3000)

  // test("should work with waitFor()", () => {
  //   clientSocket.emit("baz");

  //   return waitFor(gateway.server, "baz");
  // });
  
  // afterAll(() => {
  //   gateway.handleConnection(client) // 여기 서버 설정이라 없는거 같은데 
  // })



});
