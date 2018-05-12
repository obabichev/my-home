import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Transaction} from '../../../model/transaction';
import {TransactionService} from '../../../service/transaction.service';
import {filter, map} from 'rxjs/operators';
import {Wallet} from '../../../model/wallet';
import {WalletService} from '../../../service/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  transactions: Transaction[] = [];
  wallet: Wallet = null;
  walletId: string;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private transactionService: TransactionService,
              private walletService: WalletService) {
  }

  ngOnInit() {
    const walletId: string = this.route.snapshot.params['id'];
    this.walletId = walletId;
    this.getTransactions(walletId);
    this.getWallet(walletId);
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

  getWallet(walletId: string) {
    this.walletService.getWalletById(walletId)
      .subscribe((wallet: Wallet) => this.wallet = wallet);
  }

  onChangeEditMode(value: boolean) {
    this.editMode = value;
  }

  saveWalletChanges() {
    this.walletService.updateWallet(this.wallet)
      .subscribe(wallet => {
        this.wallet = wallet;
        this.onChangeEditMode(false);
      });
  }
}
