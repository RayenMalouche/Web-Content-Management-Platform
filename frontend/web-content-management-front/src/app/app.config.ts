import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

// main.ts bootstraps with exactly this config. It used to replace these
// providers with its own (HttpClientModule, a second route table and router
// debug tracing), so this file had no effect.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withRouterConfig({ paramsInheritanceStrategy: 'always' })),
    provideHttpClient(),
  ]
};
