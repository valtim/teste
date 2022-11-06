import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelPousoComponent } from './rel-pouso.component';

describe('RelPousoComponent', () => {
  let component: RelPousoComponent;
  let fixture: ComponentFixture<RelPousoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelPousoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelPousoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
