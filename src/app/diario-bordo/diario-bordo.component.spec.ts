import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioBordoComponent } from './diario-bordo.component';

describe('DiarioBordoComponent', () => {
  let component: DiarioBordoComponent;
  let fixture: ComponentFixture<DiarioBordoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioBordoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioBordoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
