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
            brokers: ['pkc-ldvr1.asia-southeast1.gcp.confluent.cloud:9092'],
            ssl: true,
            sasl: {
              mechanism: 'plain',
              username: 'S3MOJJUU4ITVXWHV',
              password:
                'sxEoS85PNh6R7K59gl9VViNtgT1oCecktVGn7sx91cq4u2Dy5YpWiuzUswEhXXLw',
            },
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
