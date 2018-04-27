import {Component, OnInit} from '@angular/core';
import {WalletService} from '../service/wallet.service';
import {TransactionService} from '../service/transaction.service';
import {Transaction} from '../model/transaction';
import {Wallet} from '../model/wallet';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[];
  wallets: Wallet[];

  displayedColumns = ['type', 'amount', 'icon'];

  constructor(private walletService: WalletService,
              private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.transactionService.getAllTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });

    this.walletService.getAllWallets().subscribe(wallets => {
      this.wallets = wallets;
    });
  }
}
