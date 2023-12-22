import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEmailBocaComponent } from './cadastro-email-boca.component';

describe('CadastroEmailBocaComponent', () => {
  let component: CadastroEmailBocaComponent;
  let fixture: ComponentFixture<CadastroEmailBocaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroEmailBocaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEmailBocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
