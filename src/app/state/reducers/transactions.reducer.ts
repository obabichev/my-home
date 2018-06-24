import {Transaction} from '../../model/transaction';
import {TransactionActions} from '../actions/transactions.actions';
import {PayloadAction} from '../actions/PayloadAction';

export interface TransactionsState {
  transactions: Transaction[];
}

export const TRANSACTIONS_REDUCER_INITIAL_STATE: Transaction[] = [];

export function transactionsReducer(lastState: TransactionsState, action: PayloadAction): TransactionsState {
  switch (action.type) {
    case TransactionActions.SET_TRANSACTIONS: {
      const {transactions} = action.payload;
      return {
        transactions
      };
    }
    // default: {
    //   return lastState;
    // }
  }
  return lastState || TRANSACTIONS_REDUCER_INITIAL_STATE;
}
