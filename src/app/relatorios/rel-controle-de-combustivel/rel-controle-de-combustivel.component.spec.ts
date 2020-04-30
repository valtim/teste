import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelControleDeCombustivelComponent } from './rel-controle-de-combustivel.component';

describe('RelControleDeCombustivelComponent', () => {
  let component: RelControleDeCombustivelComponent;
  let fixture: ComponentFixture<RelControleDeCombustivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelControleDeCombustivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelControleDeCombustivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
