import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:19092'],
      },
      consumer: {
        groupId: 'pricing-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  const PORT = process.env.PORT || 4100;
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Trading Gateway is running on port ${PORT}`);
  });
}
bootstrap();
