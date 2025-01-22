import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateAccountComponent } from './create-account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateAccountComponent, // Include the standalone component in imports
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges(); // Trigger initial change detection
  });

  afterEach(() => {
    httpMock.verify(); // Ensure there are no outstanding HTTP requests
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an alert if passwords do not match', () => {
    spyOn(window, 'alert'); // Spy on the alert function
    component.user.password = 'password123';
    component.user.confirmPassword = 'password456';

    component.createAccount();

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });

  it('should send an HTTP POST request on valid form submission', () => {
    component.user.username = 'testuser';
    component.user.password = 'password123';
    component.user.confirmPassword = 'password123';

    component.createAccount();

    const req = httpMock.expectOne('http://localhost:2000/auth-service/api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'testuser',
      password: 'password123',
      password_confirm: 'password123',
    });

    // Simulate a successful response
    req.flush({ access_token: 'fake-token' });
  });

  it('should navigate to the login page on successful account creation', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.user.username = 'testuser';
    component.user.password = 'password123';
    component.user.confirmPassword = 'password123';

    component.createAccount();

    const req = httpMock.expectOne('http://localhost:2000/auth-service/api/auth/register');
    req.flush({ access_token: 'fake-token' });

    expect(routerSpy).toHaveBeenCalledWith(['/log-in']);
  });

  it('should display an error message on HTTP error', () => {
    component.user.username = 'testuser';
    component.user.password = 'password123';
    component.user.confirmPassword = 'password123';

    component.createAccount();

    const req = httpMock.expectOne('http://localhost:2000/auth-service/api/auth/register');
    req.flush(
      { message: 'Username already exists' },
      { status: 400, statusText: 'Bad Request' }
    );

    expect(component.errorMessage).toBe('Username already exists');
  });
});