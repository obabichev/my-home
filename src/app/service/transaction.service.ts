import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Transaction} from '../model/transaction';
import {Observable} from 'rxjs/Observable';
import {RestService} from './rest.service';

const API_URL = environment.apiUrl;

const TRANSACTION_URL = API_URL + '/transaction';

@Injectable()
export class TransactionService {

  constructor(private rest: RestService) {
  }

  public getAllTransactions(): Observable<Transaction[]> {
    return this.rest.rget(TRANSACTION_URL)
      .map((transactions: any[]) => transactions.map(t => new Transaction(t)));
  }

  public createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.rest.rpost(TRANSACTION_URL, transaction)
      .map((createdTransaction: any) => new Transaction(createdTransaction));
  }
}
