import {Component, OnInit} from '@angular/core';
import {Wallet} from '../model/wallet';
import {Classifier} from '../model/classifier';
import {WalletService} from '../service/wallet.service';
import {Router} from '@angular/router';
import {CurrenciesService} from '../service/currencies.service';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  wallet: Wallet = new Wallet({
    total: 0,
    currency: null
  });

  currencies: Classifier[] = [];

  constructor(private walletService: WalletService,
              private router: Router,
              private currenciesService: CurrenciesService) {
  }

  ngOnInit() {
    this.currencies = this.currenciesService.getCurrencies();
    this.wallet.currency = this.currencies[0];
  }

  onSubmit() {
    this.walletService.createWallet(this.wallet)
      .subscribe(() => {
        this.router.navigate(['/wallets']);
      });
  }

}
