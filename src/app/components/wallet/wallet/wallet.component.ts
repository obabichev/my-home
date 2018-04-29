import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Transaction} from '../../../model/transaction';
import {TransactionService} from '../../../service/transaction.service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  transactions: Transaction[] = [];
  walletId: string;

  constructor(private route: ActivatedRoute,
              private transactionService: TransactionService) {
  }

  ngOnInit() {
    const walletId: string = this.route.snapshot.params['id'];
    this.walletId = walletId;
    this.getTransactions(walletId);
  }

  getTransactions(walletId: string) {
    this.transactionService.getAllTransactions()
      .pipe(map((transactions: Transaction[]): Transaction[] => {
        return transactions.filter(transaction => transaction.walletId === walletId);
      }))
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      });
  }
}
