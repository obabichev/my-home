export class Transaction {
  public _id: number;
  public walletId: string;
  public amount: number;
  public date: Date;
  public type: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
