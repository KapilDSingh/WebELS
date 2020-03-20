import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardChartComponent } from './dash-board-chart.component';

describe('DashBoardChartComponent', () => {
  let component: DashBoardChartComponent;
  let fixture: ComponentFixture<DashBoardChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
