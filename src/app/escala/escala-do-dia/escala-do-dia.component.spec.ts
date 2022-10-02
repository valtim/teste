import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EscalaDoDiaComponent } from './escala-do-dia.component';

describe('EscalaDoDiaComponent', () => {
  let component: EscalaDoDiaComponent;
  let fixture: ComponentFixture<EscalaDoDiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaDoDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaDoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
