import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MotivoDoErroNoPreenchimentoComponent } from './motivo-do-erro-no-preenchimento.component';

describe('MotivoDoErroNoPreenchimentoComponent', () => {
  let component: MotivoDoErroNoPreenchimentoComponent;
  let fixture: ComponentFixture<MotivoDoErroNoPreenchimentoComponent>;

  beforeEach(waitForAsync(() => {
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
