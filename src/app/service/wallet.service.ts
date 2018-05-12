import {Injectable} from '@angular/core';
import {Wallet} from '../model/wallet';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {RestService} from './rest.service';

const API_URL = environment.apiUrl;

const WALLET_URL = API_URL + '/wallet';

@Injectable()
export class WalletService {

  constructor(private rest: RestService) {
  }

  public getAllWallets(): Observable<Wallet[]> {
    return this.rest.rget(WALLET_URL)
      .map((wallets: Object[]) => wallets.map(w => new Wallet(w)));
  }

  public getWalletById(id: string): Observable<Wallet> {
    return this.rest.rget(`${WALLET_URL}/${id}`)
      .map((wallet: any) => new Wallet(wallet));
  }

  public createWallet(wallet: Wallet): Observable<Wallet> {
    return this.rest.rpost(WALLET_URL, wallet)
      .map((createdWallet: any) => new Wallet(createdWallet));
  }

  public updateWallet(wallet: Wallet): Observable<Wallet> {
    return this.rest.rput(`${WALLET_URL}/${wallet._id}`, wallet)
      .map((createdWallet: any) => new Wallet(createdWallet));
  }

  public deleteWallet(id: string) {
    return this.rest.rdelete(`${WALLET_URL}/${id}`);
  }
}
