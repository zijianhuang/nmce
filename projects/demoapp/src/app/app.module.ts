import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NGMDModule } from './ngmd.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UI_ServicesModule } from '../../../../dist/nmce';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    UI_ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
