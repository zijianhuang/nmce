import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import {
  ActionSheetItemSubjectService, DIALOG_ACTIONS_ALIGN, LOG_DIALOG_OPTIONS, Nmce_UI_ServicesModule,
  NotificationsService
} from 'nmce';
import { AppRoutingModule } from './app-routing.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      RouterModule,
      BrowserAnimationsModule,
      Nmce_UI_ServicesModule,
    ),

    {
      provide: LOG_DIALOG_OPTIONS, useFactory: () => {
        return {
          useIcon: true,
          useTitle: true,
        };
      }
    },

    provideHttpClient(
      withInterceptorsFromDi()
    ),

    {
      provide: 'print.cssUrl',
      useValue: 'print190826.css'
    },

    {
      provide: DIALOG_ACTIONS_ALIGN,
      useValue: 'center'
    },

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
        appearance: 'outline'
      }
    },

    NotificationsService,
    ActionSheetItemSubjectService,
  ]

}
