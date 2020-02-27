import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenmixChartComponent } from './genmix-chart.component';

describe('GenmixChartComponent', () => {
  let component: GenmixChartComponent;
  let fixture: ComponentFixture<GenmixChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenmixChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenmixChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
