import Alpaca from '@alpacahq/alpaca-trade-api';

export interface AlpacaModuleOptions {
  keyId: string;
  secretKey: string;
  paper: boolean;
}
