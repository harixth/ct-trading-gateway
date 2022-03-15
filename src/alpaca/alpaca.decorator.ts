import { Inject } from '@nestjs/common';
import { ALPACA_CONFIG_OPTIONS } from './alpaca.constant';

export function InjectAlpaca() {
  return Inject(ALPACA_CONFIG_OPTIONS);
}
