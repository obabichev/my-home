import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
// import {Http} from '@angular/common/http';

@Injectable()
export class TransactionsService {

  result: any;

  constructor(private _http: Http) {
  }

  getUsers() {
    // return this._http.get('/api/transaction')
    //   .map(result => this.result = result.json().data);
  }
}
