import {Wallet} from '../../model/wallet';
import {PayloadAction} from '../actions/PayloadAction';

export const WALLET_REDUCER_INITIAL_STATE: Wallet[] = [];

export function walletsReducer(state: Wallet[] = WALLET_REDUCER_INITIAL_STATE, action: PayloadAction): Wallet[] {
  switch (action.type) {
    default:
      return state;
  }
}
