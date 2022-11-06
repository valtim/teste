import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EscalaSemanalComponent } from './escala-semanal.component';

describe('EscalaSemanalComponent', () => {
  let component: EscalaSemanalComponent;
  let fixture: ComponentFixture<EscalaSemanalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
