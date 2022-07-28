import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoDePerguntaComponent } from './grupo-de-pergunta.component';

describe('GrupoDePerguntaComponent', () => {
  let component: GrupoDePerguntaComponent;
  let fixture: ComponentFixture<GrupoDePerguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoDePerguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoDePerguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
