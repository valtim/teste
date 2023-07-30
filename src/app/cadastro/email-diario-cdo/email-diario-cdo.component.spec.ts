import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDiarioCdoComponent } from './email-diario-cdo.component';

describe('EmailDiarioCdoComponent', () => {
  let component: EmailDiarioCdoComponent;
  let fixture: ComponentFixture<EmailDiarioCdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDiarioCdoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDiarioCdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
