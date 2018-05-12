import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Transaction} from '../../../model/transaction';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Wallet} from '../../../model/wallet';
import {transactionDateComparator} from '../../../utils/comparators/transactionDateComparator';

@Component({
  selector: 'app-all-transactions-table',
  templateUrl: './all-transactions-table.component.html',
  styleUrls: ['./all-transactions-table.component.css']
})
export class AllTransactionsTableComponent implements OnInit {

  public _wallets: Wallet[] = null;
  public _transactions: Transaction[] = [];

  dateFormatOptions: Object = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Transaction> = null;

  displayedColumns = ['wallet', 'type', 'amount', 'date', 'icon'];

  @Input()
  set transactions(transactions: Transaction[]) {
    this._transactions = transactions;
    this.setDataSource(this._transactions);
  }

  @Input()
  set wallets(wallets: Wallet[]) {
    this._wallets = wallets;
    this.setDataSource(this._transactions);
  }

  setDataSource(transactions: Transaction[]) {
    this.dataSource = new MatTableDataSource<Transaction>(this.sortTransactions(transactions));
    this.dataSource.paginator = this.paginator;
  }

  get wallets() {
    return this._wallets;
  }

  constructor() {
  }

  ngOnInit() {
    this.wallets = [];
  }

  walletNameById(walletId: string): string {
    if (!walletId) {
      return '';
    }
    for (const wallet of this._wallets) {
      if (wallet._id === walletId) {
        return wallet.name;
      }
    }
    return '';
  }

  sortTransactions(transactions: Transaction[]): Transaction[] {
    return transactions.sort(transactionDateComparator);
  }
}
