import {Wallet} from '../../model/wallet';
import {PayloadAction} from '../actions/PayloadAction';

export interface WalletsState {
  wallets: Wallet[];
}

export const WALLET_REDUCER_INITIAL_STATE = {
  wallets: []
};

export function walletsReducer(state: WalletsState = WALLET_REDUCER_INITIAL_STATE, action: PayloadAction): WalletsState {
  switch (action.type) {
    default:
      return state;
  }
}
