import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FadigaComponent } from './fadiga.component';

describe('FadigaComponent', () => {
  let component: FadigaComponent;
  let fixture: ComponentFixture<FadigaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FadigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
