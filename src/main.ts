import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
  );

  // validate all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // allow only the properties that are in the DTO
      forbidNonWhitelisted: true, // throw an error if the DTO has any properties that are not in the DTO
    }),
  );
  await app.listen();

  logger.log(`Products Microservice is running on port ${envs.port}`);
}
bootstrap();
