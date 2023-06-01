import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelMedicaoComponent } from './rel-medicao.component';

describe('RelMedicaoComponent', () => {
  let component: RelMedicaoComponent;
  let fixture: ComponentFixture<RelMedicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelMedicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelMedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
