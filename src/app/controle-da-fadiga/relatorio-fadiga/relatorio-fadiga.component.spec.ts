import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFadigaComponent } from './relatorio-fadiga.component';

describe('RelatorioFadigaComponent', () => {
  let component: RelatorioFadigaComponent;
  let fixture: ComponentFixture<RelatorioFadigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioFadigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioFadigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
