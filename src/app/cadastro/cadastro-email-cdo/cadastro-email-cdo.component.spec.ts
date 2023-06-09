import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEmailCdoComponent } from './cadastro-email-cdo.component';

describe('CadastroEmailCdoComponent', () => {
  let component: CadastroEmailCdoComponent;
  let fixture: ComponentFixture<CadastroEmailCdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroEmailCdoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEmailCdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
