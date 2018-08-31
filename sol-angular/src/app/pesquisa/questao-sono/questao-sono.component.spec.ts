import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestaoSonoComponent } from './questao-sono.component';

describe('QuestaoSonoComponent', () => {
  let component: QuestaoSonoComponent;
  let fixture: ComponentFixture<QuestaoSonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestaoSonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestaoSonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
