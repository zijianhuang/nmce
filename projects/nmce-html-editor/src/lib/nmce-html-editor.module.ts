import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import {
  LocalDocEditorDialogService, LocalDocHtmlEditorDialogComponent, EmailConfirmComponent,
  EmailConfirmService
} from './index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Nmce_UI_ServicesModule } from 'nmce';
import { NGMDModule } from '../ngmd.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LocalDocHtmlEditorDialogComponent,
    EmailConfirmComponent ], 
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, NGMDModule, Nmce_UI_ServicesModule, AngularEditorModule
  ],
  exports: [LocalDocHtmlEditorDialogComponent, EmailConfirmComponent],
  providers: [
    LocalDocEditorDialogService,
    EmailConfirmService]
})
export class NmceHtmlEditorModule { }
