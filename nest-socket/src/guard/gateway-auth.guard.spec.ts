import { ExecutionContext } from '@nestjs/common';
import { GatewayAuthGuard } from './gateway-auth.guard';
import { WsException } from '@nestjs/websockets';

describe('GatewayGuardGuard', () => {

  let guard: GatewayAuthGuard;

  beforeAll(() => {
    guard = new GatewayAuthGuard();
  });


  it('should be defined', () => {
    expect(new GatewayAuthGuard()).toBeDefined();
  });

  describe('canActivate', () => {
    test('should return true if token is valid', () => {
      const context: ExecutionContext = {
        getArgs: jest.fn().mockReturnValue([{ handshake: { auth: { token: 'Token' } } }])
      } as unknown as ExecutionContext

      expect(guard.canActivate(context)).toBe(true)
    })

    test('should throw WsException if token is invalid', () => {
      const context: ExecutionContext = {
        getArgs: jest.fn().mockReturnValue([{ handshake: { auth: { token: 'InvalidToken' } } }])
      } as unknown as ExecutionContext

      // console.log(context)
      // console.log(() => guard.canActivate(context),'!!!')

      try {
        () => guard.canActivate(context)
      } catch (e) {
        expect(e).toBeInstanceOf(WsException)
      }
    })
  });
});
