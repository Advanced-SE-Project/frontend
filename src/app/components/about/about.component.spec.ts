import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, RouterTestingModule], // If the component is standalone
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

  it('should not throw an error when the element does not exist', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    expect(() => component.scrollToAbout()).not.toThrow();
  });
});