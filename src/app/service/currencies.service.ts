import {Injectable} from '@angular/core';
import {Classifier} from '../model/classifier';

@Injectable()
export class CurrenciesService {

  currencies: Classifier[] = [
    new Classifier({
      code: 'RUB',
      value: 'RUB'
    }),
    new Classifier({
      code: 'EUR',
      value: 'EUR'
    }),
    new Classifier({
      code: 'USD',
      value: 'USD'
    })
  ];

  constructor() {
  }

  getCurrencies(): Classifier[] {
    return this.currencies;
  }
}
