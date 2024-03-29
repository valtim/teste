import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InformativoComponent } from './informativo.component';

describe('InformativoComponent', () => {
  let component: InformativoComponent;
  let fixture: ComponentFixture<InformativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InformativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
