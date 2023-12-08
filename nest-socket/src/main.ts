import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './chat/socketIoAdapter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.enableCors({
    origin: [process.env.APP_URL],
    credentials: true
  })
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));
  await app.listen(3000);
}
bootstrap();
