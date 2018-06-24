import {Injectable} from '@angular/core';
import {Transaction} from '../../model/transaction';
import {PayloadAction} from './PayloadAction';

@Injectable()
export class TransactionActions {
  static SET_TRANSACTIONS = 'SET_TRANSACTIONS';

  setTransactions(transactions: Transaction[]): PayloadAction {
    return {
      type: TransactionActions.SET_TRANSACTIONS,
      payload: {
        transactions
      }
    };
  }
}
