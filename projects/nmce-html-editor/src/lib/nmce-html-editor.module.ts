import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Nmce_UI_ServicesModule } from 'nmce';
import { NGMDModule } from '../ngmd.module';
import {
  EmailConfirmComponent,
  EmailConfirmService, LocalDocEditorDialogService, LocalDocHtmlEditorDialogComponent
} from './index';

@NgModule({
  declarations: [LocalDocHtmlEditorDialogComponent,
    EmailConfirmComponent ], 
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NGMDModule, Nmce_UI_ServicesModule, AngularEditorModule
  ],
  exports: [LocalDocHtmlEditorDialogComponent, EmailConfirmComponent],
  providers: [
    LocalDocEditorDialogService,
    EmailConfirmService]
})
export class NmceHtmlEditorModule { }
