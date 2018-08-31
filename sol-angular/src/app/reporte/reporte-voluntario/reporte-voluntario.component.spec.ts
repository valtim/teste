import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVoluntarioComponent } from './reporte-voluntario.component';

describe('ReporteVoluntarioComponent', () => {
  let component: ReporteVoluntarioComponent;
  let fixture: ComponentFixture<ReporteVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
