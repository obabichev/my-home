import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {TransactionCreateComponent} from './components/transaction/transaction-create/transaction-create.component';
import {FormsModule} from '@angular/forms';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import {TransactionComponent} from './components/transaction/transaction/transaction.component';
import {HttpClientModule} from '@angular/common/http';
import {TransactionEditComponent} from './components/transaction/transaction-edit/transaction-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule,
  MatSelectModule, MatTableModule, MatPaginatorModule, MatGridListModule, MatDialogModule, MatToolbarModule
} from '@angular/material';
import {WalletService} from './service/wallet.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {TransactionService} from './service/transaction.service';
import {
  WalletDeleteDialogComponent,
  WalletCardsComponent
} from './components/wallet/wallet-cards/wallet-cards.component';
import {WalletComponent} from './components/wallet/wallet/wallet.component';
import {TransactionsTableComponent} from './components/transaction/transactions-table/transactions-table.component';
import {WalletCreateComponent} from './components/wallet/wallet-create/wallet-create.component';
import {CurrenciesService} from './service/currencies.service';
import {TransactionTypesService} from './service/transaction-types.service';
import {AuthenticationService} from './service/authentication.service';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {ProfileComponent} from './components/auth/profile/profile.component';
import {AuthGuardService} from './service/auth-guard.service';
import {RestService} from './service/rest.service';
import {AllTransactionsTableComponent} from './components/transaction/all-transactions-table/all-transactions-table.component';


const appRoutes: Routes = [
  {
    path: 'transactions',
    component: TransactionComponent,
    data: {title: 'Transactions list'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'transaction-create',
    component: TransactionCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'transaction-edit/:id',
    component: TransactionEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'wallets',
    component: WalletCardsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'wallet/:id',
    component: WalletComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'wallet-create',
    component: WalletCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
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
    TransactionEditComponent,
    WalletCardsComponent,
    WalletComponent,
    TransactionsTableComponent,
    WalletCreateComponent,
    WalletDeleteDialogComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AllTransactionsTableComponent
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
    MatGridListModule,
    MatDialogModule,
    MatToolbarModule
  ],
  providers: [
    WalletService,
    TransactionService,
    CurrenciesService,
    TransactionTypesService,
    AuthenticationService,
    AuthGuardService,
    RestService
  ],
  bootstrap: [AppComponent],
  entryComponents: [WalletDeleteDialogComponent]
})
export class AppModule {
}
