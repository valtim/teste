import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ControleDeAcessoEditComponent } from './controle-de-acesso-edit.component';

describe('ControleDeAcessoEditComponent', () => {
  let component: ControleDeAcessoEditComponent;
  let fixture: ComponentFixture<ControleDeAcessoEditComponent>;

  beforeEach(waitForAsync(() => {
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
