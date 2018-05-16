import {Classifier} from './classifier';

export class Wallet {
  public _id: string;
  public name: string;
  public currency: Classifier;
  public total: number;
  public description?: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
    const currency: Classifier = new Classifier(values.currency);
    this.currency = currency;
  }

}
