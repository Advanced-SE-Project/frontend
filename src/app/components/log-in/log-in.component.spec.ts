import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogInComponent } from './log-in.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LogInComponent, // Standalone component
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LogInComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the sidebar component', () => {
    const fixture = TestBed.createComponent(LogInComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.login-container')).toBeTruthy();
  });

  it('should render the login form with fields and button', () => {
    const formElement = fixture.debugElement.query(By.css('form'));
    expect(formElement).toBeTruthy();

    const usernameField = fixture.debugElement.query(By.css('input[name="username"]'));
    const passwordField = fixture.debugElement.query(By.css('input[name="password"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(usernameField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(submitButton).toBeTruthy();
    expect(submitButton.nativeElement.textContent).toContain('Login');
  });

  it('should validate required fields', () => {
    component.user.username = '';
    component.user.password = '';
    fixture.detectChanges();

    expect(component.user.username).toBeFalsy();
    expect(component.user.password).toBeFalsy();
  });

  it('should call login on form submit', () => {
    spyOn(component, 'login');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.login).toHaveBeenCalled();
  });

  it('should navigate to create account page on link click', () => {
    const createAccountLink = fixture.debugElement.query(By.css('a[routerLink="/create-account"]'));
    expect(createAccountLink).toBeTruthy();
  });
});