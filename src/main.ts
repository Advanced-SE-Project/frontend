import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    // Include BrowserAnimationsModule for animations
    importProvidersFrom(BrowserAnimationsModule),

    // Keep the ng2-charts providers
    provideCharts(withDefaultRegisterables()),
  ],
}).catch((err) => console.error(err));