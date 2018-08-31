import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContramedidasComponent } from './contramedidas.component';

describe('ContramedidasComponent', () => {
  let component: ContramedidasComponent;
  let fixture: ComponentFixture<ContramedidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContramedidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContramedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
