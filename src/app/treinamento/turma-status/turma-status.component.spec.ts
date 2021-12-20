import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaStatusComponent } from './turma-status.component';

describe('TurmaStatusComponent', () => {
  let component: TurmaStatusComponent;
  let fixture: ComponentFixture<TurmaStatusComponent>;

  beforeEach(async(() => {
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
