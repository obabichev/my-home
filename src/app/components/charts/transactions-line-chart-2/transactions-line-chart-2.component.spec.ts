import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsLineChart2Component } from './transactions-line-chart-2.component';

describe('TransactionsLineChart2Component', () => {
  let component: TransactionsLineChart2Component;
  let fixture: ComponentFixture<TransactionsLineChart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsLineChart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsLineChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
