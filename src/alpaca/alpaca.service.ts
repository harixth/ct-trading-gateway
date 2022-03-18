const Alpaca = require('@alpacahq/alpaca-trade-api');
import AlpacaType from '@alpacahq/alpaca-trade-api';
import { Injectable, Inject } from '@nestjs/common';
import { ALPACA_CONFIG_OPTIONS } from './alpaca.constant';
import { AlpacaModuleOptions } from './interface/alpaca-options.interface';

@Injectable()
export class AlpacaService extends Alpaca {
  constructor(
    @Inject(ALPACA_CONFIG_OPTIONS)
    options: AlpacaModuleOptions,
  ) {
    super({ ...options });
  }

  // client(): AlpacaType {
  //   const { keyId, secretKey, config } = this.options;
  //   const client = new Alpaca({
  //     keyId,
  //     secretKey,
  //     config,
  //   });
  //   return client;
  // }
}
