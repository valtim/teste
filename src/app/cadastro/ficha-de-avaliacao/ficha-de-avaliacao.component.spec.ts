import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDeAvaliacaoComponent } from './ficha-de-avaliacao.component';

describe('FichaDeAvaliacaoComponent', () => {
  let component: FichaDeAvaliacaoComponent;
  let fixture: ComponentFixture<FichaDeAvaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaDeAvaliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaDeAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
