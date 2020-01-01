import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtgridvaluesComponent } from './rtgridvalues.component';

describe('RtgridvaluesComponent', () => {
  let component: RtgridvaluesComponent;
  let fixture: ComponentFixture<RtgridvaluesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtgridvaluesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtgridvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
