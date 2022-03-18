import { AlpacaCryptoClient } from '@alpacahq/alpaca-trade-api/dist/resources/datav2/crypto_websocket_v2';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectAlpaca } from 'src/alpaca/alpaca.decorator';
import { AlpacaService } from 'src/alpaca/alpaca.service';

@Injectable()
export class PriceService {
  private alpacaCryptoClient: AlpacaCryptoClient = this.alpaca.crypto_stream_v2;
  constructor(@InjectAlpaca() private readonly alpaca: AlpacaService) {}

  init() {
    this.alpacaCryptoClient.connect();
    return this.alpacaCryptoClient.onConnect(() => {
      this.alpacaCryptoClient.subscribeForBars([
        'BTCUSD',
        'ETHUSD',
        'DOGEUSD',
        'USDTUSD',
      ]);
    });
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
