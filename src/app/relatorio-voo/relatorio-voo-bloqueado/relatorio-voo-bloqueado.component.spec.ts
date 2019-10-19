import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVooBloqueadoComponent } from './relatorio-voo-bloqueado.component';

describe('RelatorioVooBloqueadoComponent', () => {
  let component: RelatorioVooBloqueadoComponent;
  let fixture: ComponentFixture<RelatorioVooBloqueadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioVooBloqueadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVooBloqueadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
