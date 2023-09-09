import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightStripComponent } from './flight-strip.component';

describe('FlightStripComponent', () => {
  let component: FlightStripComponent;
  let fixture: ComponentFixture<FlightStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightStripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
