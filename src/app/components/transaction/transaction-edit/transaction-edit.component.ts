import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDatepickerInputEvent} from "@angular/material";
import {TransactionTypesService} from '../../../service/transaction-types.service';
import {TransactionService} from '../../../service/transaction.service';
import {Transaction} from '../../../model/transaction';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {

  transaction: Transaction = null;
  types: string[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private transactionTypesService: TransactionTypesService,
              private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.getTransaction(this.route.snapshot.params['id']);
    this.types = this.transactionTypesService.getTransactionTypes();
  }

  getTransaction(id) {
    this.transactionService.getTransactionDetails(id)
      .subscribe(
        (transaction: Transaction) => {
          this.transaction = transaction;
        },
        err => console.log('Error', err));
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.transaction.date = event.value;
  }

  onSubmit() {
    this.transactionService.updateTransaction(this.transaction)
      .subscribe((transaction: Transaction) => {
          this.router.navigate(['/wallet', transaction.walletId]);
        },
        err => console.log('Error', err));
  }

  deleteTransaction(id) {
    this.transactionService.deleteTransaction(id)
      .subscribe(res => {
          this.router.navigate(['wallet', this.transaction.walletId]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
