import {Transaction} from '../../model/transaction';
import {TransactionActions} from '../actions/transactions.actions';
import {PayloadAction} from '../actions/PayloadAction';

export const TRANSACTIONS_REDUCER_INITIAL_STATE: Transaction[] = [];

export function transactionsReducer(state: Transaction[] = TRANSACTIONS_REDUCER_INITIAL_STATE, action: PayloadAction): Transaction[] {
  switch (action.type) {
    case TransactionActions.SET_TRANSACTIONS: {
      const {transactions} = action.payload;
      return transactions;
    }
    default: {
      return state;
    }
  }
}
