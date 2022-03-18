import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceGateway } from './price.gateway';

@Module({
  providers: [PriceGateway, PriceService],
  exports: [PriceService],
})
export class PriceModule {}
