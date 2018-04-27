import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Wallet} from '../model/wallet';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

const WALLET_URL = API_URL + '/wallet';

@Injectable()
export class WalletService {

  constructor(private http: HttpClient) {
  }

  public getAllWallets() {
    return this.http.get(WALLET_URL)
      .map(wallets => wallets.map(w => new Wallet(w)));
  }
}
