import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportComponent } from './support.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportComponent, BrowserAnimationsModule, RouterTestingModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
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

  it('should render FAQ section with panels', () => {
    const faqSection = fixture.debugElement.query(By.css('.faq-section'));
    expect(faqSection).toBeTruthy();

    const expansionPanels = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));
    expect(expansionPanels.length).toBe(3);

    const panelTitles = expansionPanels.map(panel => panel.query(By.css('mat-panel-title')).nativeElement.textContent.trim());
    expect(panelTitles).toEqual([
      'How do I add transactions?',
      'How can I track my expenses?',
      'How do I update my account information?'
    ]);
  });

  it('should render contact form with fields and submit button', () => {
    const nameField = fixture.debugElement.query(By.css('input[placeholder="Your Name"]'));
    const messageField = fixture.debugElement.query(By.css('textarea[placeholder="Your Message"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(nameField).toBeTruthy();
    expect(messageField).toBeTruthy();
    expect(submitButton).toBeTruthy();
    expect(submitButton.nativeElement.textContent).toContain('Send');
  });

  it('should toggle expansion panels on click', () => {
    const expansionPanels = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));

    expansionPanels[0].query(By.css('mat-expansion-panel-header')).nativeElement.click();
    fixture.detectChanges();

    expect(expansionPanels[0].classes['mat-expanded']).toBeTruthy();

    expansionPanels[0].query(By.css('mat-expansion-panel-header')).nativeElement.click();
    fixture.detectChanges();

    expect(expansionPanels[0].classes['mat-expanded']).toBeFalsy();
  });
});