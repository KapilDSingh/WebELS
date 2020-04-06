import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LMPChartComponent } from './lmpchart.component';

describe('LMPChartComponent', () => {
  let component: LMPChartComponent;
  let fixture: ComponentFixture<LMPChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LMPChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LMPChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
