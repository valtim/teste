import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLdapComponent } from './login-ldap.component';

describe('LoginLdapComponent', () => {
  let component: LoginLdapComponent;
  let fixture: ComponentFixture<LoginLdapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLdapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLdapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
