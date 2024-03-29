import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HorasVoadasTripulanteComponent } from './horas-voadas-tripulante.component';

describe('HorasVoadasTripulanteComponent', () => {
  let component: HorasVoadasTripulanteComponent;
  let fixture: ComponentFixture<HorasVoadasTripulanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVoadasTripulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVoadasTripulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
