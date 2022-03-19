import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'pricing-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Trading Gateway is running on port ${PORT}`);
  });
}
bootstrap();
