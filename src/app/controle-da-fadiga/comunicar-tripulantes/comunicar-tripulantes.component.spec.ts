import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComunicarTripulantesComponent } from './comunicar-tripulantes.component';

describe('ComunicarTripulantesComponent', () => {
  let component: ComunicarTripulantesComponent;
  let fixture: ComponentFixture<ComunicarTripulantesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicarTripulantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicarTripulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
