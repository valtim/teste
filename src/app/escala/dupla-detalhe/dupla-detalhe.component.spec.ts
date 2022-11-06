import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DuplaDetalheComponent } from './dupla-detalhe.component';

describe('DuplaDetalheComponent', () => {
  let component: DuplaDetalheComponent;
  let fixture: ComponentFixture<DuplaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
