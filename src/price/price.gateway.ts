import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PriceService } from './price.service';

@WebSocketGateway(3080, {
  cors: {
    origin: ['http://localhost:3001'],
    credentials: true,
  },
})
export class PriceGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly priceService: PriceService) {}

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
    return this.priceService.destroy();
  }

  handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`Client connected: ${socket.id}`);
    try {
      return this.priceService.init();
    } catch (err) {
      console.log(err);
    }
  }

  @SubscribeMessage('price_panel')
  handleEvent(@MessageBody() data: unknown, @ConnectedSocket() socket: Socket) {
    return this.priceService.getQoutes(socket);
  }
}
