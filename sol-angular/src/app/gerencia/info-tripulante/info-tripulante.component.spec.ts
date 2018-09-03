import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTripulanteComponent } from './info-tripulante.component';

describe('InfoTripulanteComponent', () => {
  let component: InfoTripulanteComponent;
  let fixture: ComponentFixture<InfoTripulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTripulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTripulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
