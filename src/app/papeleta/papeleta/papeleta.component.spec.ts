import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeletaComponent } from './papeleta.component';

describe('PapeletaComponent', () => {
  let component: PapeletaComponent;
  let fixture: ComponentFixture<PapeletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PapeletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PapeletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
