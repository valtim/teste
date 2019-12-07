import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaTrabalhoComponent } from './escala-trabalho.component';

describe('EscalaTrabalhoComponent', () => {
  let component: EscalaTrabalhoComponent;
  let fixture: ComponentFixture<EscalaTrabalhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaTrabalhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
