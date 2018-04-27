export class Classifier {
  public code: string;
  public value: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
