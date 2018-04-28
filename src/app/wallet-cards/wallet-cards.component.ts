import {Component, OnInit} from '@angular/core';
import {WalletService} from '../service/wallet.service';
import {Wallet} from '../model/wallet';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-wallet-cards',
  templateUrl: './wallet-cards.component.html',
  styleUrls: ['./wallet-cards.component.css']
})
export class WalletCardsComponent implements OnInit {

  wallets: Wallet[] = [];

  constructor(private walletService: WalletService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateWallets();
  }

  updateWallets() {
    this.walletService.getAllWallets().subscribe(wallets => {
      this.wallets = wallets;
    });
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(WalletDeleteDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
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

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
