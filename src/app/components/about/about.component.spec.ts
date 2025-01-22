import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, RouterTestingModule, MatButtonModule, MatToolbarModule], // If the component is standalone
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Mocking the params or any data used in the component
            params: of({ id: '123' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the about section when the element exists', () => {
    const element = document.createElement('div');
    element.id = 'about-text';
    document.body.appendChild(element);

    spyOn(document, 'getElementById').and.returnValue(element);
    component.scrollToAbout();
    expect(document.getElementById).toHaveBeenCalledWith('about-text');
    document.body.removeChild(element);
  });

  it('should render toolbar with logo and login button', () => {
    const toolbarElement = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbarElement).toBeTruthy();

    const logo = toolbarElement.query(By.css('img.logo-img'));
    expect(logo).toBeTruthy();
    expect(logo.attributes['src']).toContain('logo_with_title.png');

    const loginButton = toolbarElement.query(By.css('button[routerLink="/log-in"]'));
    expect(loginButton).toBeTruthy();
    expect(loginButton.nativeElement.textContent).toContain('Login');
  });

  it('should render about content and buttons', () => {
    const aboutContent = fixture.debugElement.query(By.css('.about-content'));
    expect(aboutContent).toBeTruthy();

    const getStartedButton = aboutContent.query(By.css('button'));
    expect(getStartedButton).toBeTruthy();
    expect(getStartedButton.nativeElement.textContent).toContain('Get Started');
  });

  it('should render about us section with create account button', () => {
    const aboutTextSection = fixture.debugElement.query(By.css('#about-text'));
    expect(aboutTextSection).toBeTruthy();

    const createAccountButton = aboutTextSection.query(By.css('button[routerLink="/create-account"]'));
    expect(createAccountButton).toBeTruthy();
    expect(createAccountButton.nativeElement.textContent).toContain('Create Account');
  });

  it('should not throw an error when the element does not exist', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    expect(() => component.scrollToAbout()).not.toThrow();
  });
});