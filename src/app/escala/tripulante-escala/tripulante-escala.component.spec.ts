import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulanteEscalaComponent } from './tripulante-escala.component';

describe('TripulanteEscalaComponent', () => {
  let component: TripulanteEscalaComponent;
  let fixture: ComponentFixture<TripulanteEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripulanteEscalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripulanteEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
