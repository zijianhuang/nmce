import { NgModule } from '@angular/core';
import {
  LocalDocEditorDialogService, LocalDocHtmlEditorDialogComponent, EmailConfirmComponent,
  EmailConfirmService
} from './index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UI_ServicesModule } from 'nmce';
import { NGMDModule } from '../ngmd.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [LocalDocHtmlEditorDialogComponent,
    EmailConfirmComponent], 
  imports: [
    FormsModule, ReactiveFormsModule, NGMDModule, UI_ServicesModule, AngularEditorModule
  ],
  exports: [LocalDocHtmlEditorDialogComponent, EmailConfirmComponent],
  providers: [
    LocalDocEditorDialogService,
    EmailConfirmService]
})
export class NmceHtmlEditorModule { }
