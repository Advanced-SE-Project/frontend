import { TestBed } from '@angular/core/testing';
import { LogInComponent } from './log-in.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogInComponent', () => {
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

  it('should create', () => {
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
});