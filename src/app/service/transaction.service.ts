import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../model/transaction';

const API_URL = environment.apiUrl;

const TRANSACTION_URL = API_URL + '/transaction';

@Injectable()
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  public getAllTransactions() {
    return this.http.get(TRANSACTION_URL)
      .map(transactions => transactions.map(t => new Transaction(t)));
  }
}
