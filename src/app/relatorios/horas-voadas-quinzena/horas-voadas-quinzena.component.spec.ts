import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HorasVoadasQuinzenaComponent } from './horas-voadas-quinzena.component';

describe('HorasVoadasQuinzenaComponent', () => {
  let component: HorasVoadasQuinzenaComponent;
  let fixture: ComponentFixture<HorasVoadasQuinzenaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVoadasQuinzenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVoadasQuinzenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
