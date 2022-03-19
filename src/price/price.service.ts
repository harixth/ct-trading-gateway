import { AlpacaCryptoClient } from '@alpacahq/alpaca-trade-api/dist/resources/datav2/crypto_websocket_v2';
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from 'kafkajs';
import { firstValueFrom } from 'rxjs';
import { Socket } from 'socket.io';
import { InjectAlpaca } from 'src/alpaca/alpaca.decorator';
import { AlpacaService } from 'src/alpaca/alpaca.service';
import { CRYPTO_SYMBOLS } from './constants';
import { CryptoPrice } from './types';

@Injectable()
export class PriceService {
  private alpacaCryptoClient: AlpacaCryptoClient = this.alpaca.crypto_stream_v2;
  constructor(@InjectAlpaca() private readonly alpaca: AlpacaService) {}

  init(producer: ClientKafka) {
    try {
      this.alpacaCryptoClient.connect();
      return this.alpacaCryptoClient.onConnect(() => {
        this.alpacaCryptoClient.subscribeForBars(CRYPTO_SYMBOLS);
        this.alpacaCryptoClient.onCryptoBar(async (price: CryptoPrice) => {
          console.log(`[${price.Timestamp}] ${price.Symbol} - ${price.Close}`);
          return firstValueFrom(
            producer.send(`crypto.prices.${price.Symbol}`, price),
          ).catch((err) => console.error(err));
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  getQoutes(socket: Socket) {
    return this.alpacaCryptoClient.onCryptoBar((price) => {
      // if (price.Symbol === 'BTCUSD') {
      //   socket.emit('BTCUSD_close', price.Close);
      // }
      // if (price.Symbol === 'ETHUSD') {
      //   socket.emit('ETHUSD_close', price.Close);
      // }
      socket.emit('qoutes_completed', price);
    });
  }

  destroy() {
    return this.alpacaCryptoClient.disconnect();
  }
}
