import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulanteListaComponent } from './tripulanteLista.component';

describe('TripulanteComponent', () => {
  let component: TripulanteListaComponent;
  let fixture: ComponentFixture<TripulanteListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TripulanteListaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripulanteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
