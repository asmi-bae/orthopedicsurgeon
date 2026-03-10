import { ApplicationConfig, provideZonelessChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { jwtInterceptor, AUTH_API_URL } from '@repo/auth';
import { TranslationService } from './core/services/translation.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor])
    ),
    provideAnimationsAsync(),
    { provide: AUTH_API_URL, useValue: 'http://localhost:4202/api/v1/patient/auth' },
    {
      provide: APP_INITIALIZER,
      useFactory: (ts: TranslationService, http: HttpClient) => () => ts.init(http),
      deps: [TranslationService, HttpClient],
      multi: true
    }
  ]
};
