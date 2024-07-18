import { ApplicationConfig, APP_INITIALIZER, inject, Inject, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpParams, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app-routes';
import { apiInterceptor } from './core/api/services/api-interceptor.service';
import { environment } from '../environments/environment';
import { ApiConfiguration } from './core/api/services/api-configuration.service';
import { InitiateConfig } from './core/services/initiate-config.service';
import { UserLogService } from './core/services/user-log.service';

export function initApiConfiguration(config: ApiConfiguration) {
  return () => {
    config.rootUrl = environment.apiUrl;
  };
}

export const INIT_API_CONFIGURATION: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initApiConfiguration,
  deps: [ApiConfiguration],
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    INIT_API_CONFIGURATION,
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideAnimations(),
    { provide: Inject },
    {
      provide: APP_INITIALIZER,
      useFactory: InitiateConfig.initApp,
      multi: true,
      deps: [UserLogService, Inject],
    },
  ]
};
