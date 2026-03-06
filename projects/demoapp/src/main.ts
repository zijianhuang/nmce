import { enableProdMode } from '@angular/core';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ThemeLoader } from './app/themeLoader';

if (environment.production) {
  enableProdMode();
}

console.info(`Main Startup selectedTheme: ${ThemeLoader.selectedTheme}`);
ThemeLoader.loadTheme(ThemeLoader.selectedTheme); // could be null or what stored in localStorage.

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

