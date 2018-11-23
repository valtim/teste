import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulanteComponent } from './tripulante.component';

describe('TripulanteComponent', () => {
  let component: TripulanteComponent;
  let fixture: ComponentFixture<TripulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
