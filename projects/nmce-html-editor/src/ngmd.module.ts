import { NgModule, LOCALE_ID } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, } from '@angular/material/core'; //MD tutorial site use this.

import { LayoutModule } from '@angular/cdk/layout';

import {
	MatButtonModule,
} from '@angular/material/button';
import {
	MatAutocompleteModule,
} from '@angular/material/autocomplete';
import {
	MatButtonToggleModule,
} from '@angular/material/button-toggle';
import {
	MatGridListModule,
} from '@angular/material/grid-list';
import {
	MatIconModule,
} from '@angular/material/icon';
import {
	MatInputModule,
} from '@angular/material/input';
import {
	MatListModule,
} from '@angular/material/list';
import {
	MatMenuModule,
} from '@angular/material/menu';
import {
	MatChipsModule,
} from '@angular/material/chips';
import {
	MatDatepickerModule,
} from '@angular/material/datepicker';
import {
	MatDialogModule,
} from '@angular/material/dialog';
import {
	MatExpansionModule,
} from '@angular/material/expansion';
import {

	MatNativeDateModule,
} from '@angular/material/core';
import {
	MatPaginatorModule,
} from '@angular/material/paginator';
import {
	MatProgressBarModule,
} from '@angular/material/progress-bar';
import {
	MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import {
	MatRadioModule,
} from '@angular/material/radio';
import {
	MatRippleModule,
} from '@angular/material/core';
import {
	MatSelectModule,
} from '@angular/material/select';
import {

	MatSidenavModule,
} from '@angular/material/sidenav';
import {
	MatSliderModule,
} from '@angular/material/slider';
import {
	MatSnackBarModule,
} from '@angular/material/snack-bar';
import {
	MatSortModule,
} from '@angular/material/sort';
import {
	MatTableModule,
} from '@angular/material/table';
import {
	MatTabsModule,
} from '@angular/material/tabs';
import {
	MatToolbarModule,
} from '@angular/material/toolbar';
import {
	MatTooltipModule,
} from '@angular/material/tooltip';
import {
	MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import {
	MatStepperModule,
} from '@angular/material/stepper';
import {
	MatCardModule,
} from '@angular/material/card';
import {
	MatCheckboxModule,
} from '@angular/material/checkbox';
import {
	MatBadgeModule
} from '@angular/material/badge';

@NgModule({
	exports: [
		//CdkTableModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatBadgeModule,
		MatChipsModule,
		//MatCoreModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		//MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatBottomSheetModule,

		LayoutModule,
		MatStepperModule,
		ScrollingModule,
	],
	providers: [
		//{ provide: MAT_DIALOG_DATA, useValue: {} },
		//{ provide: MatDialogRef, useValue: {} }

		//{ provide: MAT_DATE_LOCALE, useValue: 'en-AU' },By default, the MAT_DATE_LOCALE injection token will use the existing LOCALE_ID locale code from @angular/core.
		//If you want to override it, you can provide a new value for the MAT_DATE_LOCALE token

		// The adapter has to be provided to each lazy module which imports this module.
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [LOCALE_ID] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

	]
})
export class NGMDModule { }
