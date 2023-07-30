import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinaturaRDVComponent } from './assinatura-rdv.component';

describe('AssinaturaRDVComponent', () => {
  let component: AssinaturaRDVComponent;
  let fixture: ComponentFixture<AssinaturaRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinaturaRDVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssinaturaRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
