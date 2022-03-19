import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { PriceGateway } from './price/price.gateway';
import { CryptoPrice } from './price/types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly priceGateway: PriceGateway,
  ) {}

  @Get()
  getHello(): Promise<string> {
    return this.appService.findCryptoPrice();
  }

  @MessagePattern('crypto.prices.BTCUSD')
  readBTCUSD(@Payload() message: { value: CryptoPrice }) {
    this.emitPrice(message.value);
  }

  @MessagePattern('crypto.prices.ETHUSD')
  readETHUSD(@Payload() message: { value: CryptoPrice }) {
    this.emitPrice(message.value);
  }

  @MessagePattern('crypto.prices.DOGEUSD')
  readDOGEUSD(@Payload() message: { value: CryptoPrice }) {
    this.emitPrice(message.value);
  }

  @MessagePattern('crypto.prices.LTCUSD')
  readLTCUSD(@Payload() message: { value: CryptoPrice }) {
    this.emitPrice(message.value);
  }

  private emitPrice(cp: CryptoPrice) {
    const updatedPrice = {
      currency: '$',
      value: cp.Close.toLocaleString(),
      previous: cp.Open.toLocaleString(),
      change: Number((((cp.Close - cp.Open) / cp.Open) * 100).toFixed(2)),
    };
    this.priceGateway.emit(`${cp.Symbol}_PRICE_UPDATED`, updatedPrice);
  }
}
