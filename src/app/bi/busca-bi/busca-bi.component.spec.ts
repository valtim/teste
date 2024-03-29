import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscaBiComponent } from './busca-bi.component';

describe('BuscaBiComponent', () => {
  let component: BuscaBiComponent;
  let fixture: ComponentFixture<BuscaBiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
