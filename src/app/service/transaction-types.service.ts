import {Injectable} from '@angular/core';

@Injectable()
export class TransactionTypesService {

  transactionTypes: string[] = [
    'Food and drinks',
    'Shopping',
    'Housing',
    'Transport',
    'Vehicle',
    'Life & Entertainment',
    'Communication, PC',
    'Income',
    'Other'
  ];

  constructor() {
  }

  getTransactionTypes(): string[] {
    return this.transactionTypes;
  }
}
