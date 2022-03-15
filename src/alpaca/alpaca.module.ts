import { DynamicModule, Module } from '@nestjs/common';
import { ALPACA_CONFIG_OPTIONS } from './alpaca.constant';
import { createAlpacaProvider } from './alpaca.provider';
import { AlpacaModuleOptions } from './interface/alpaca-options.interface';

@Module({
  exports: [ALPACA_CONFIG_OPTIONS],
})
export class AlpacaModule {
  static register(options: AlpacaModuleOptions): DynamicModule {
    return {
      module: AlpacaModule,
      providers: createAlpacaProvider(options),
    };
  }
}
