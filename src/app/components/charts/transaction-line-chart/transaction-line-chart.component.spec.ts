import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLineChartComponent } from './transaction-line-chart.component';

describe('TransactionLineChartComponent', () => {
  let component: TransactionLineChartComponent;
  let fixture: ComponentFixture<TransactionLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
