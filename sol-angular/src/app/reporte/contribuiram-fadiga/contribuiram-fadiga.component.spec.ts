import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuiramFadigaComponent } from './contribuiram-fadiga.component';

describe('ContribuiramFadigaComponent', () => {
  let component: ContribuiramFadigaComponent;
  let fixture: ComponentFixture<ContribuiramFadigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContribuiramFadigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribuiramFadigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
