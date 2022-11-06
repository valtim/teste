import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TurmaComponent } from './turma.component';

describe('TurmaComponent', () => {
  let component: TurmaComponent;
  let fixture: ComponentFixture<TurmaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
