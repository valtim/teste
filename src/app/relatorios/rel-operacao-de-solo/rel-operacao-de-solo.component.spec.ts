import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelOperacaoDeSoloComponent } from './rel-operacao-de-solo.component';

describe('RelOperacaoDeSoloComponent', () => {
  let component: RelOperacaoDeSoloComponent;
  let fixture: ComponentFixture<RelOperacaoDeSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelOperacaoDeSoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelOperacaoDeSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
