import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransactionsTableComponent } from './all-transactions-table.component';

describe('AllTransactionsTableComponent', () => {
  let component: AllTransactionsTableComponent;
  let fixture: ComponentFixture<AllTransactionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTransactionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
