import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEscalaComponent } from './email-escala.component';

describe('EmailEscalaComponent', () => {
  let component: EmailEscalaComponent;
  let fixture: ComponentFixture<EmailEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEscalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
