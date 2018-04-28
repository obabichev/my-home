import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {TransactionCreateComponent} from './transaction-create/transaction-create.component';
import {FormsModule} from '@angular/forms';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import {TransactionComponent} from './transaction/transaction.component';
import {HttpClientModule} from '@angular/common/http';
import {TransactionDetailsComponent} from './transaction-details/transaction-details.component';
import {TransactionEditComponent} from './transaction-edit/transaction-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule,
  MatSelectModule, MatTableModule, MatPaginatorModule, MatGridListModule
} from '@angular/material';
import {WalletService} from './service/wallet.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {TransactionService} from './service/transaction.service';
import {WalletCardsComponent} from './wallet-cards/wallet-cards.component';
import {WalletComponent} from './wallet/wallet.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';


const appRoutes: Routes = [
  {
    path: 'transactions',
    component: TransactionComponent,
    data: {title: 'Transactions list'}
  },
  {
    path: 'transaction-create',
    component: TransactionCreateComponent
  },
  {
    path: 'transaction-edit/:id',
    component: TransactionEditComponent
  },
  {
    path: 'transaction-details/:id',
    component: TransactionDetailsComponent
  },
  {
    path: 'wallets',
    component: WalletCardsComponent
  },
  {
    path: 'wallet/:id',
    component: WalletComponent
  },
  {
    path: '',
    redirectTo: '/wallets',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionCreateComponent,
    TransactionComponent,
    TransactionDetailsComponent,
    TransactionEditComponent,
    WalletCardsComponent,
    WalletComponent,
    TransactionsTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DateValueAccessorModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule
  ],
  providers: [
    WalletService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
