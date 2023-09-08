import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcoComponent } from './cco.component';

describe('CcoComponent', () => {
  let component: CcoComponent;
  let fixture: ComponentFixture<CcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
