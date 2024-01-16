import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class WsFilter extends BaseWsExceptionFilter {
  private logger: Logger = new Logger(WsFilter.name)
  catch(exception: WsException, host: ArgumentsHost) {

    this.logger.log('catch ws error filter')

    const clientSocket: Socket = host.getArgByIndex(0)
    
    clientSocket.emit('exception', {
      status: 'error',
      message: `${exception.message}`
    })

    super.catch(exception, host);
  }
}
