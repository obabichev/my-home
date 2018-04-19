export class Transaction {
  constructor(public id: number,
              public amount: number,
              public type?: string,
              public date: Date) {
  }
}
