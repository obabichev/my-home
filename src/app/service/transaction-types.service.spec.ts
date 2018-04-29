import { TestBed, inject } from '@angular/core/testing';

import { TransactionTypesService } from './transaction-types.service';

describe('TransactionTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionTypesService]
    });
  });

  it('should be created', inject([TransactionTypesService], (service: TransactionTypesService) => {
    expect(service).toBeTruthy();
  }));
});
