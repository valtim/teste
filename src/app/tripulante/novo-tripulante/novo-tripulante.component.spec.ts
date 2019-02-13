import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTripulanteComponent } from './novo-tripulante.component';

describe('NovoTripulanteComponent', () => {
  let component: NovoTripulanteComponent;
  let fixture: ComponentFixture<NovoTripulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoTripulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTripulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
