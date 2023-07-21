import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDiarioFadigaComponent } from './email-diario-fadiga.component';

describe('EmailDiarioFadigaComponent', () => {
  let component: EmailDiarioFadigaComponent;
  let fixture: ComponentFixture<EmailDiarioFadigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDiarioFadigaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDiarioFadigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
