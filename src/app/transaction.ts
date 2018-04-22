export class Transaction {
  public _id: number;
  public amount: number;
  public date: Date;
  public type: string;

  constructor(public amount: number,
              public date: Date,
              public type?: string) {
  }
}
