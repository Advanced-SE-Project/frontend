import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(BrowserAnimationsModule),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));