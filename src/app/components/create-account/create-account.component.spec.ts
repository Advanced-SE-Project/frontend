import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAccountComponent } from './create-account.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountComponent, FormsModule] // Include FormsModule for ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sidebar component', () => {
    const sidebarElement = fixture.debugElement.nativeElement.querySelector('app-sidebar');
    expect(sidebarElement).toBeTruthy();
  });

  it('should render the form with required fields', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
    const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.user.username).toBeFalsy();
    expect(component.user.password).toBeFalsy();
    expect(component.user.confirmPassword).toBeFalsy();
    expect(fixture.nativeElement.querySelector('form').checkValidity()).toBeFalse();
  });

  it('should call createAccount() when the form is submitted', () => {
    spyOn(component, 'createAccount');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    // Simulate form submission
    form.dispatchEvent(new Event('submit'));

    expect(component.createAccount).toHaveBeenCalled();
  });

  it('should render a link to log-in', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/log-in"]')).nativeElement;
    expect(link).toBeTruthy();
    expect(link.textContent).toContain('Already have an account? Login');
  });

  it('should have a valid form when all fields are filled', () => {
    component.user.username = 'testuser';
    component.user.password = 'password123';
    component.user.confirmPassword = 'password123';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('form').checkValidity()).toBeTrue();
  });
});