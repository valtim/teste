import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaInformativoComponent } from './lista-informativo.component';

describe('ListaInformativoComponent', () => {
  let component: ListaInformativoComponent;
  let fixture: ComponentFixture<ListaInformativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInformativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
