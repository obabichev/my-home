import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Transaction} from '../../../model/transaction';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {transactionDateComparator} from '../../../utils/comparators/transactionDateComparator';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {

  dateFormatOptions: Object = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  @Input()
  set transactions(transactions: Transaction[]) {
    this.dataSource = new MatTableDataSource<Transaction>(transactions.sort(transactionDateComparator));
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Transaction> = null;

  displayedColumns = ['type', 'amount', 'date', 'icon'];

  constructor() {
  }

  ngOnInit() {
  }
}
