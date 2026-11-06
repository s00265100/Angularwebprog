import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { errorInterceptor } from './core/interceptors/error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
  provideRouter(routes, withComponentInputBinding()),
  provideHttpClient(withInterceptors([errorInterceptor]))
]
};
