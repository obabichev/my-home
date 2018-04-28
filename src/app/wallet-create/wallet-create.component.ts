import {Component, OnInit} from '@angular/core';
import {Wallet} from '../model/wallet';
import {Classifier} from '../model/classifier';
import {WalletService} from '../service/wallet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  wallet: Wallet = new Wallet({
    total: 0,
    currency: new Classifier({
      code: 'RUR',
      value: 'RUR'
    })
  });

  constructor(private walletService: WalletService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.walletService.createWallet(this.wallet)
      .subscribe(() => {
        this.router.navigate(['/wallets']);
      });
  }

}
