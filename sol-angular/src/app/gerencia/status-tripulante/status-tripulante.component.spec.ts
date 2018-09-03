import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTripulanteComponent } from './status-tripulante.component';

describe('StatusTripulanteComponent', () => {
  let component: StatusTripulanteComponent;
  let fixture: ComponentFixture<StatusTripulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusTripulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTripulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
