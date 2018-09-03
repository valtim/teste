import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGerenciaComponent } from './login-gerencia.component';

describe('LoginGerenciaComponent', () => {
  let component: LoginGerenciaComponent;
  let fixture: ComponentFixture<LoginGerenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginGerenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
