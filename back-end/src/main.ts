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
  app.use(cookieParser())
  await app.listen(serverPort);
}
bootstrap();
