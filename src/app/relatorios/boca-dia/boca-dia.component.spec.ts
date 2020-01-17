import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BocaDiaComponent } from './boca-dia.component';

describe('BocaDiaComponent', () => {
  let component: BocaDiaComponent;
  let fixture: ComponentFixture<BocaDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BocaDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BocaDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
