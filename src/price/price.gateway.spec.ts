import { Test, TestingModule } from '@nestjs/testing';
import { PriceGateway } from './price.gateway';
import { PriceService } from './price.service';

describe('PriceGateway', () => {
  let gateway: PriceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceGateway, PriceService],
    }).compile();

    gateway = module.get<PriceGateway>(PriceGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
