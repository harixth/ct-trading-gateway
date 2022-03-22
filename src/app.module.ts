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
            clientId: 'pricing',
            brokers: [process.env.KAFKA_BROKER ?? 'localhost:29092'],
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
