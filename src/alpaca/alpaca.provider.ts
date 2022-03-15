const Alpaca = require('@alpacahq/alpaca-trade-api');
import { ALPACA_CONFIG_OPTIONS } from './alpaca.constant';
import { AlpacaModuleOptions } from './interface/alpaca-options.interface';

export function createAlpacaProvider(module: AlpacaModuleOptions): any[] {
  const alpaca = new Alpaca({
    ...module.config,
    keyId: module.keyId,
    secretKey: module.secretKey,
  });
  return [{ provide: ALPACA_CONFIG_OPTIONS, useValue: alpaca }];
}
