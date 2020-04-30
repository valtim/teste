import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAnaliseDeRiscoComponent } from './visualizar-analise-de-risco.component';

describe('VisualizarAnaliseDeRiscoComponent', () => {
  let component: VisualizarAnaliseDeRiscoComponent;
  let fixture: ComponentFixture<VisualizarAnaliseDeRiscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarAnaliseDeRiscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAnaliseDeRiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
