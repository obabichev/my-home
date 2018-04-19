import {Component, OnInit} from '@angular/core';
import {Transaction} from '../transaction';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  types: string[] = ['food', 'transport', 'apartment'];
  model: Transaction = new Transaction(0, 1, this.types[0], new Date());
  submitted = false;

  constructor() {
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {
  }
}
