import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteGraficoComponent } from './teste-grafico.component';

describe('TesteGraficoComponent', () => {
  let component: TesteGraficoComponent;
  let fixture: ComponentFixture<TesteGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteGraficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
