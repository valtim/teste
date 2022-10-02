import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DuplaComponent } from './dupla.component';

describe('DuplaComponent', () => {
  let component: DuplaComponent;
  let fixture: ComponentFixture<DuplaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
