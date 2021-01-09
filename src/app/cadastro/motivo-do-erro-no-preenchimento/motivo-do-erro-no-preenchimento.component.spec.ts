import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoDoErroNoPreenchimentoComponent } from './motivo-do-erro-no-preenchimento.component';

describe('MotivoDoErroNoPreenchimentoComponent', () => {
  let component: MotivoDoErroNoPreenchimentoComponent;
  let fixture: ComponentFixture<MotivoDoErroNoPreenchimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoDoErroNoPreenchimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoDoErroNoPreenchimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
