import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterViewChartComponent } from './meter-view-chart.component';

describe('MeterViewChartComponent', () => {
  let component: MeterViewChartComponent;
  let fixture: ComponentFixture<MeterViewChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterViewChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterViewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
