import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlpacaModule } from './alpaca/alpaca.module';
import { PriceModule } from './price/price.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    AlpacaModule.register({
      keyId: 'PK4ALQOI6LIH878MJCWE',
      secretKey: '2petluGMCQgbWVnwYvkpfDqNgAG85UlnbHg77XTp',
      paper: true,
    }),
    ClientsModule.register([
      {
        name: 'PRICING_SERVICE',
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
            groupId: 'pricing-consumer',
          },
        },
      },
    ]),
    PriceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
