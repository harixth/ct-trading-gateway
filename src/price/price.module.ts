import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceGateway } from './price.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRADING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'trading-consumer',
          },
        },
      },
    ]),
  ],
  providers: [PriceGateway, PriceService],
  exports: [PriceGateway, PriceService],
})
export class PriceModule {}
