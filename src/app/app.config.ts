import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { transactionFeature } from "./store/transaction.feature";
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import * as effects from "./store/transaction.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState(transactionFeature),
    provideEffects(effects)
  ],
};
