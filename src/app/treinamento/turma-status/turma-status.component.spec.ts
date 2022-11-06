import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TurmaStatusComponent } from './turma-status.component';

describe('TurmaStatusComponent', () => {
  let component: TurmaStatusComponent;
  let fixture: ComponentFixture<TurmaStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
