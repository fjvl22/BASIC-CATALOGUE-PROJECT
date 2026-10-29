import { ApplicationConfig, provideBrowserGlobalErrorListeners } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    CurrencyPipe,
  ],
};