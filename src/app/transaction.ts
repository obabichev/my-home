export class Transaction {
  public _id: number;

  constructor(public amount: number,
              public date: Date,
              public type?: string) {
  }
}
