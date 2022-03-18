import { Injectable } from '@nestjs/common';
import { InjectAlpaca } from './alpaca/alpaca.decorator';
import { AlpacaService } from './alpaca/alpaca.service';

@Injectable()
export class AppService {
  constructor(@InjectAlpaca() private readonly alpaca: AlpacaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findCryptoPrice(): Promise<string> {
    try {
      let resp = await this.alpaca.getBarsV2(['AAPL'], {
        start: '2022-02-01',
        timeframe: '1Day',
      });
      let bars = [];
      for await (let bar of resp) {
        bars.push(bar);
      }
      console.log(bars);
      return 'e';
    } catch (err) {
      console.error(err);
    }
  }
}
