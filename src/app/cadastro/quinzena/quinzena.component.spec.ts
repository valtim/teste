import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuinzenaComponent } from './quinzena.component';

describe('QuinzenaComponent', () => {
  let component: QuinzenaComponent;
  let fixture: ComponentFixture<QuinzenaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuinzenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuinzenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
