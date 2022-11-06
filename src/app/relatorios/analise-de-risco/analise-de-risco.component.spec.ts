import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnaliseDeRiscoComponent } from './analise-de-risco.component';

describe('AnaliseDeRiscoComponent', () => {
  let component: AnaliseDeRiscoComponent;
  let fixture: ComponentFixture<AnaliseDeRiscoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseDeRiscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseDeRiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
