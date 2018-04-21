export class Transaction {
  constructor(public id: number,
              public amount: number,
              public date: Date,
              public type?: string) {
  }
}
