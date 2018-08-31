import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinaisCognitivosComponent } from './sinais-cognitivos.component';

describe('SinaisCognitivosComponent', () => {
  let component: SinaisCognitivosComponent;
  let fixture: ComponentFixture<SinaisCognitivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinaisCognitivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinaisCognitivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
