import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrilhoComponent } from './trilho.component';

describe('TrilhoComponent', () => {
  let component: TrilhoComponent;
  let fixture: ComponentFixture<TrilhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrilhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrilhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
