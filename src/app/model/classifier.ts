export class Classifier {
  public code: string;
  public value: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
