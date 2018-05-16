import {Transaction} from '../transaction';

export class TransactionPoint {
  public transaction: Transaction;
  public value: number;
  public date: Date;

  constructor(transaction: Transaction, value: number, date: Date) {
    this.transaction = transaction;
    this.value = value;
    this.date = date;
  }
}
