import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Wallet} from '../model/wallet';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

const API_URL = environment.apiUrl;

const WALLET_URL = API_URL + '/wallet';

@Injectable()
export class WalletService {

  constructor(private http: HttpClient) {
  }

  public getAllWallets(): Observable<Wallet[]> {
    return this.http.get(WALLET_URL)
      .map((wallets: Object[]) => wallets.map(w => new Wallet(w)));
  }

  public createWallet(wallet: Wallet) {
    return this.http.post(WALLET_URL, wallet);
  }
}
