import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../../model/transaction';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material';
import {WalletService} from '../../../service/wallet.service';
import {TransactionService} from '../../../service/transaction.service';
import {Wallet} from '../../../model/wallet';
import {TransactionTypesService} from '../../../service/transaction-types.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  types: string[] = [];
  wallets: Wallet[] = [];

  transaction: Transaction = new Transaction({
    amount: 0,
    date: new Date(),
    type: ''
  });
  submitted = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private walletService: WalletService,
              private transactionService: TransactionService,
              private transactionTypesService: TransactionTypesService) {
  }

  onSubmit() {
    this.submitted = true;
    this.saveTransaction();
  }

  saveTransaction() {
    this.transactionService.createTransaction(this.transaction)
      .subscribe(res => {
          const id = res['walletId'];
          this.router.navigate(['/wallet', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
    const walletId: string = this.route.snapshot.params['walletId'];
    if (walletId) {
      this.transaction.walletId = walletId;
    }
    this.walletService.getAllWallets().subscribe(wallets => {
      this.wallets = wallets;
    });
    this.types = this.transactionTypesService.getTransactionTypes();
    this.transaction.type = this.types[0];
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.transaction.date = event.value;
  }
}
