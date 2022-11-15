import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplaAdmComponent } from './dupla-adm.component';

describe('DuplaAdmComponent', () => {
  let component: DuplaAdmComponent;
  let fixture: ComponentFixture<DuplaAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplaAdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplaAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
