import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelPousoComponent } from './rel-pouso.component';

describe('RelPousoComponent', () => {
  let component: RelPousoComponent;
  let fixture: ComponentFixture<RelPousoComponent>;

  beforeEach(async(() => {
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
