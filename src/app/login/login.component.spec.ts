import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be valid when email and password are set', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('submitting a valid form should navigate to /home and set loggedIn to true', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    const sessionStorageSpy = spyOn(sessionStorage, 'setItem');
  
    component.loginForm.setValue({ email: 'dummy@gmail.com', password: 'dummy' });
    component.onSubmit();
  
    expect(component.loginForm.valid).toBeTruthy();
    expect(routerSpy).toHaveBeenCalledWith('/home', { skipLocationChange: false });
    expect(sessionStorageSpy).toHaveBeenCalledWith('loggedIn', 'true');
  });

  it('submitting an invalid form should not navigate and show an alert', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    const sessionStorageSpy = spyOn(sessionStorage, 'setItem');
    const alertSpy = spyOn(window, 'alert');

    component.loginForm.setValue({ email: 'invalid@gmail.com', password: 'wrong' });
    component.onSubmit();

    expect(component.loginForm.valid).toBeTruthy();
    expect(routerSpy).not.toHaveBeenCalled();
    expect(sessionStorageSpy).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Invalid credentials');
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
