import { Injectable, Inject } from '@nestjs/common';
import Alpaca from '@alpacahq/alpaca-trade-api';
import { ALPACA_CONFIG_OPTIONS } from './alpaca.constant';
import { AlpacaModuleOptions } from './interface/alpaca-options.interface';

@Injectable()
export class AlpacaService extends Alpaca {
  constructor(
    @Inject(ALPACA_CONFIG_OPTIONS)
    options: AlpacaModuleOptions,
  ) {
    super(options.config);
  }
}
