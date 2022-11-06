import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ControleDeAcessoComponent } from './controle-de-acesso.component';

describe('ControleDeAcessoComponent', () => {
  let component: ControleDeAcessoComponent;
  let fixture: ComponentFixture<ControleDeAcessoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleDeAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleDeAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
