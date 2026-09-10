import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    importProvidersFrom(NgbModule),
  ],
};
