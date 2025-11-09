import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Nmce_UI_ServicesModule } from 'nmce';
import { NGMDModule } from '../ngmd.module';
import { EmailConfirmComponent } from './emailConfirm.component';
import { LocalDocHtmlEditorDialogComponent } from './localDocHtmlEditorDialog.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NGMDModule, Nmce_UI_ServicesModule, AngularEditorModule,
    LocalDocHtmlEditorDialogComponent,
    EmailConfirmComponent ,
  ],
  exports: [LocalDocHtmlEditorDialogComponent, EmailConfirmComponent]
})
export class NmceHtmlEditorModule { }
