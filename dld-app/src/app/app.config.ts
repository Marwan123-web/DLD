import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { routes } from './app.routes';
import { API_TRANSPORT } from './core/api/api-transport.token';
import { HttpApiTransport } from './core/api/http-api-transport';
import { MockApiTransport } from './core/api/mock-api-transport';
import { appConfig as runtimeConfig, assertValidAppConfig } from './core/config/app-config';
import { authInterceptor } from './core/http/auth.interceptor';
import { correlationInterceptor } from './core/http/correlation.interceptor';
import { apiErrorInterceptor } from './core/http/api-error.interceptor';

assertValidAppConfig();

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        correlationInterceptor,
        apiErrorInterceptor,
      ]),
    ),
    {
      provide: API_TRANSPORT,
      useFactory: (http: HttpApiTransport, mock: MockApiTransport) =>
        runtimeConfig.useMockData ? mock : http,
      deps: [HttpApiTransport, MockApiTransport],
    },
    provideCharts(withDefaultRegisterables()),
  ],
};
