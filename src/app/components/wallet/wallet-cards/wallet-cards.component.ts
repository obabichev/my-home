import {Component, OnInit} from '@angular/core';
import {WalletService} from '../../../service/wallet.service';
import {Wallet} from '../../../model/wallet';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Transaction} from '../../../model/transaction';
import {TransactionService} from '../../../service/transaction.service';

@Component({
  selector: 'app-wallet-cards',
  templateUrl: './wallet-cards.component.html',
  styleUrls: ['./wallet-cards.component.css']
})
export class WalletCardsComponent implements OnInit {

  wallets: Wallet[] = [];
  transactions: Transaction[] = [];

  constructor(private walletService: WalletService,
              private transactionService: TransactionService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateWallets();
    this.updateTransactions();
  }

  updateWallets() {
    this.walletService.getAllWallets().subscribe(wallets => {
      this.wallets = wallets;
    });
  }

  updateTransactions() {
    this.transactionService.getAllTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(WalletDeleteDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.walletService.deleteWallet(id).subscribe(() => {
          this.wallets = this.wallets.filter(wallet => wallet._id !== id);
        });
      }
    });
  }
}

@Component({
  selector: 'app-delete-wallet-dialog',
  templateUrl: 'app-delete-wallet-dialog.html',
})
export class WalletDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<WalletDeleteDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
