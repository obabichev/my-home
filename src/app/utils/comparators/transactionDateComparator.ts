import {Transaction} from '../../model/transaction';
export const transactionDateComparator = (left: Transaction, right: Transaction): number => {
  return right.date.getTime() - left.date.getTime();
};

export const transactionDateComparatorReversed = (left: Transaction, right: Transaction): number =>
  -transactionDateComparator(left, right);
