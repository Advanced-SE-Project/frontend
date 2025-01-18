import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TokenInterceptor } from './helpers/http.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Provides HttpClient
    {
      provide: HTTP_INTERCEPTORS, // Registers the TokenInterceptor manually
      useClass: TokenInterceptor,
      multi: true,
    },
    provideAnimations(),
    provideCharts(withDefaultRegisterables()),
  ],
};
