import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions: any;

  displayedColumns = ['type', 'amount', 'icon'];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('/api/transaction').subscribe(data => {
      this.transactions = data;
    });
  }
}
