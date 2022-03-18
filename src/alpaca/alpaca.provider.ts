import { ALPACA_CONFIG_OPTIONS } from './alpaca.constant';
import { AlpacaService } from './alpaca.service';
import { AlpacaModuleOptions } from './interface/alpaca-options.interface';

export function createAlpacaProvider(options: AlpacaModuleOptions): any[] {
  return [
    { provide: ALPACA_CONFIG_OPTIONS, useValue: new AlpacaService(options) },
  ];
}
