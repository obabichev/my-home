import {Classifier} from './classifier';

export class Wallet {
  public _id: number;
  public name: string;
  public currency: Classifier;
  public total: Number;
  public description?: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    // const currency: Classifier = new Classifier(values.currency);
    // this.currency = currency;
  }

}
