import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeslocamentoComponent } from './deslocamento.component';

describe('DeslocamentoComponent', () => {
  let component: DeslocamentoComponent;
  let fixture: ComponentFixture<DeslocamentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeslocamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeslocamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
