import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogInComponent } from './log-in.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInComponent, FormsModule], // Include FormsModule for ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form with required fields', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should render the sidebar component', () => {
    const sidebarElement = fixture.debugElement.nativeElement.querySelector('app-sidebar');
    expect(sidebarElement).toBeTruthy();
  });  

  it('should have an invalid form when fields are empty', () => {
    expect(component.user.username).toBeFalsy();
    expect(component.user.password).toBeFalsy();
    expect(fixture.nativeElement.querySelector('form').checkValidity()).toBeFalse();
  });

  it('should call login() when the form is submitted', () => {
    spyOn(component, 'login');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    // Simulate form submission
    form.dispatchEvent(new Event('submit'));

    expect(component.login).toHaveBeenCalled();
  });

  it('should render a link to create an account', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/create-account"]')).nativeElement;
    expect(link).toBeTruthy();
    expect(link.textContent).toContain("Don't have an account? Create one!");
  });

  it('should have a valid form when all fields are filled', () => {
    component.user.username = 'testuser';
    component.user.password = 'password123';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('form').checkValidity()).toBeTrue();
  });
});