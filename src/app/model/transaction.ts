export class Transaction {
  public _id: string;
  public walletId: string;
  public amount: number;
  public date: Date;
  public type: string;
  public description?: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
