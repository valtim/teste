import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisaoDoDiaComponent } from './previsao-do-dia.component';

describe('PrevisaoDoDiaComponent', () => {
  let component: PrevisaoDoDiaComponent;
  let fixture: ComponentFixture<PrevisaoDoDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisaoDoDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisaoDoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
