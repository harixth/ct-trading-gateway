import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlpacaModule } from './alpaca/alpaca.module';

@Module({
  imports: [
    AlpacaModule.register({
      keyId: 'PK4ALQOI6LIH878MJCWE',
      secretKey: '2petluGMCQgbWVnwYvkpfDqNgAG85UlnbHg77XTp',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
