import {TRANSACTIONS_REDUCER_INITIAL_STATE, transactionsReducer} from './reducers/transactions.reducer';
import {combineReducers, Reducer} from 'redux';
import {WALLET_REDUCER_INITIAL_STATE, walletsReducer} from './reducers/wallets.reducer';
import {Transaction} from '../model/transaction';
import {Wallet} from '../model/wallet';

export interface AppState {
  transactions: Transaction[];
  wallets: Wallet[];
}

export const ROOT_REDUCER_INITIAL_STATE = {
  transactions: TRANSACTIONS_REDUCER_INITIAL_STATE,
  wallets: WALLET_REDUCER_INITIAL_STATE
};

export const rootReducer: Reducer = combineReducers({
  transactions: transactionsReducer,
  wallets: walletsReducer
});
