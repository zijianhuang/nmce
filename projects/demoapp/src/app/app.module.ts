import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  ActionSheetItemSubjectService, DIALOG_ACTIONS_ALIGN, LOG_DIALOG_OPTIONS, Nmce_UI_ServicesModule,
  NotificationsService
} from 'nmce';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NGMDModule } from './ngmd.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    NGMDModule,
    Nmce_UI_ServicesModule,
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
