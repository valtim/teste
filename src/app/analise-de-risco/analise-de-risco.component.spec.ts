import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseDeRiscoComponent } from './analise-de-risco.component';

describe('AnaliseDeRiscoComponent', () => {
  let component: AnaliseDeRiscoComponent;
  let fixture: ComponentFixture<AnaliseDeRiscoComponent>;

  beforeEach(async(() => {
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
