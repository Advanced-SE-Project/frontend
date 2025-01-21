import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the about section when the element exists', () => {
    const mockElement = {
      scrollIntoView: jasmine.createSpy('scrollIntoView')
    } as unknown as HTMLElement;
  
    spyOn(document, 'getElementById').and.returnValue(mockElement);
  
    component.scrollToAbout();
  
    expect(document.getElementById).toHaveBeenCalledWith('about-text');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
  
  it('should not throw an error when the element does not exist', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
  
    expect(() => component.scrollToAbout()).not.toThrow();
  });
});