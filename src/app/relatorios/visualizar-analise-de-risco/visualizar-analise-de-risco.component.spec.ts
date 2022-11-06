import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizarAnaliseDeRiscoComponent } from './visualizar-analise-de-risco.component';

describe('VisualizarAnaliseDeRiscoComponent', () => {
  let component: VisualizarAnaliseDeRiscoComponent;
  let fixture: ComponentFixture<VisualizarAnaliseDeRiscoComponent>;

  beforeEach(waitForAsync(() => {
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
