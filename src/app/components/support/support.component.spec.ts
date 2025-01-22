import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportComponent } from './support.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportComponent, BrowserAnimationsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportComponent);
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

  it('should render the form with required elements', () => {
    const formField = fixture.debugElement.nativeElement.querySelector('mat-form-field');
    const input = fixture.debugElement.nativeElement.querySelector('input');
    const button = fixture.debugElement.nativeElement.querySelector('button');

    expect(formField).toBeTruthy();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });
});