import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ObservacaoDbComponent } from './observacao-db.component';

describe('ObservacaoDbComponent', () => {
  let component: ObservacaoDbComponent;
  let fixture: ComponentFixture<ObservacaoDbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacaoDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacaoDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
