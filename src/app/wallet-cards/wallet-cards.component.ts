import {Component, OnInit} from '@angular/core';
import {WalletService} from '../service/wallet.service';
import {Wallet} from '../model/wallet';

@Component({
  selector: 'app-wallet-cards',
  templateUrl: './wallet-cards.component.html',
  styleUrls: ['./wallet-cards.component.css']
})
export class WalletCardsComponent implements OnInit {

  wallets: Wallet[] = [];

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.walletService.getAllWallets().subscribe(wallets => {
      this.wallets = wallets;
    });
  }

}
