import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: configService.get<string>('REDIS_ENDPOINT'),
    },
  });

  await app.startAllMicroservices(() =>
    logger.log('Push notif service is listening'),
  );
}
bootstrap();
