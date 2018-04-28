import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../model/transaction';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {

  @Input() transactions: Transaction[] = [];

  displayedColumns = ['type', 'amount', 'icon'];

  constructor() {
  }

  ngOnInit() {
  }

}
