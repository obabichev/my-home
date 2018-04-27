import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../model/transaction';
import {Observable} from 'rxjs/Observable';

const API_URL = environment.apiUrl;

const TRANSACTION_URL = API_URL + '/transaction';

@Injectable()
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  public getAllTransactions(): Observable<Transaction[]> {
    return this.http.get(TRANSACTION_URL)
      .map((transactions: Object[]) => transactions.map(t => new Transaction(t)));
  }

  public createTransaction(transaction: Transaction) {
    return this.http.post(TRANSACTION_URL, transaction);
  }
}
