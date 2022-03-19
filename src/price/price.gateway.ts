import { Controller, Inject } from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Consumer } from 'kafkajs';
import { Server, Socket } from 'socket.io';
import { CRYPTO_SYMBOLS } from './constants';
import { PriceService } from './price.service';

@WebSocketGateway(3080, {
  cors: {
    origin: ['http://localhost:3001'],
    credentials: true,
  },
})
@Controller()
export class PriceGateway {
  @WebSocketServer()
  server: Server;
  consumer: Consumer;
  constructor(
    private readonly priceService: PriceService,
    @Inject('TRADING_SERVICE') private readonly kafka: ClientKafka,
  ) {}

  async onModuleInit() {
    CRYPTO_SYMBOLS.forEach((symbol: string) => {
      this.kafka.subscribeToResponseOf(`crypto.prices.${symbol}`);
    });
    await this.kafka.connect();
  }

  onModuleDestroy() {
    this.kafka.close();
    return this.priceService.destroy();
  }

  afterInit() {
    console.log('Websocket Gateway initialized');
    try {
      this.kafka.createClient();
      return this.priceService.init(this.kafka);
    } catch (err) {
      console.log(err);
    }
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  async handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`Client connected: ${socket.id}`);
  }

  emit(key: string, value: any) {
    console.log(key + ': ');
    console.log(value);
    this.server.emit(key, value);
  }
}
