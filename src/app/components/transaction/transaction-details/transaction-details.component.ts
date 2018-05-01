import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionService} from '../../../service/transaction.service';
import {Transaction} from '../../../model/transaction';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  transaction: Transaction;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.getTransactionDetail(this.route.snapshot.params['id']);
  }

  getTransactionDetail(id) {
    this.transactionService.getTransactionDetails(id)
      .subscribe((transaction: Transaction) => {
        this.transaction = transaction;
      });
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
