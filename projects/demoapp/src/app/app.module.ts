import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NGMDModule } from './ngmd.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UI_ServicesModule, LOG_DIALOG_OPTIONS } from 'nmce';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NmceHtmlEditorModule } from 'nmce-html-editor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NGMDModule,
    UI_ServicesModule,
    NmceHtmlEditorModule,
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

    // {
    // 	provide: 'htmlEditor.uploadUrl',
    // 	useValue: undefined
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
