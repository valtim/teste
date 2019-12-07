import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPerguntaListComponent } from './tipo-pergunta-list.component';

describe('TipoPerguntaListComponent', () => {
  let component: TipoPerguntaListComponent;
  let fixture: ComponentFixture<TipoPerguntaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPerguntaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPerguntaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
