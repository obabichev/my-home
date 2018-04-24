import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {AppComponent} from './app.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
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
  MatSelectModule
} from '@angular/material';

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
    path: '',
    redirectTo: '/transactions',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    TransactionCreateComponent,
    TransactionComponent,
    TransactionDetailsComponent,
    TransactionEditComponent
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
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
