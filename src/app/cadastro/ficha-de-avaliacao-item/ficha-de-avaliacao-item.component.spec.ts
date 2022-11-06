import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDeAvaliacaoItemComponent } from './ficha-de-avaliacao-item.component';

describe('FichaDeAvaliacaoItemComponent', () => {
  let component: FichaDeAvaliacaoItemComponent;
  let fixture: ComponentFixture<FichaDeAvaliacaoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaDeAvaliacaoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaDeAvaliacaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
