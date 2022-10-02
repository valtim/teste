import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PesquisaBasicaComponent } from './pesquisa-basica.component';

describe('PesquisaBasicaComponent', () => {
  let component: PesquisaBasicaComponent;
  let fixture: ComponentFixture<PesquisaBasicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaBasicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaBasicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
