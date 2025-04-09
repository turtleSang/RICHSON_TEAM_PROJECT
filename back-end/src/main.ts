import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from "cookie-parser";
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['warn', 'error', 'log']
  });
  const service = app.get(ConfigService);
  const serverPort = service.get<number>('SERVER_PORT');
  app.enableCors({
    origin: 'http://localhost:4000',
    credentials: true
  })
  app.use(cookieParser())
  await app.listen(serverPort);
}
bootstrap();
