import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  private testToken = "Token"

  canActivate(context: ExecutionContext){

    const handshake = context.getArgs()[0].handshake
    const auth = handshake.auth.token

    if(this.testToken == auth) return true

    throw new WsException('Invalid credentials.');
  }
}
