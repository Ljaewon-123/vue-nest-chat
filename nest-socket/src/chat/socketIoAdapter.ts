import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';

export class SocketIoAdapter extends IoAdapter {
constructor(
  private app: INestApplicationContext,
  private configService: ConfigService,
) {
  super(app);
}

createIOServer(port: number, options?: ServerOptions) {
  const origins = this.configService.get<string>('APP_URL')
  const origin = origins.split(',')
  options.cors = { origin }
  const server = super.createIOServer(port, options)
  return server
}}