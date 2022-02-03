import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleDeAcessoEditComponent } from './controle-de-acesso-edit.component';

describe('ControleDeAcessoEditComponent', () => {
  let component: ControleDeAcessoEditComponent;
  let fixture: ComponentFixture<ControleDeAcessoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleDeAcessoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleDeAcessoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
