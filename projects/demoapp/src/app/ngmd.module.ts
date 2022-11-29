import { NgModule, LOCALE_ID } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, } from '@angular/material/core'; //MD tutorial site use this.

import { LayoutModule } from '@angular/cdk/layout';

import {
	MatLegacyButtonModule as MatButtonModule,
} from '@angular/material/legacy-button';
import {
	MatLegacyAutocompleteModule as MatAutocompleteModule,
} from '@angular/material/legacy-autocomplete';
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
	MatLegacyInputModule as MatInputModule,
} from '@angular/material/legacy-input';
import {
	MatLegacyListModule as MatListModule,
} from '@angular/material/legacy-list';
import {
	MatLegacyMenuModule as MatMenuModule,
} from '@angular/material/legacy-menu';
import {
	MatLegacyChipsModule as MatChipsModule,
} from '@angular/material/legacy-chips';
import {
	MatDatepickerModule,
} from '@angular/material/datepicker';
import {
	MatLegacyDialogModule as MatDialogModule,
} from '@angular/material/legacy-dialog';
import {
	MatExpansionModule,
} from '@angular/material/expansion';
import {

	MatNativeDateModule,
} from '@angular/material/core';
import {
	MatLegacyPaginatorModule as MatPaginatorModule,
} from '@angular/material/legacy-paginator';
import {
	MatLegacyProgressBarModule as MatProgressBarModule,
} from '@angular/material/legacy-progress-bar';
import {
	MatLegacyProgressSpinnerModule as MatProgressSpinnerModule,
} from '@angular/material/legacy-progress-spinner';
import {
	MatLegacyRadioModule as MatRadioModule,
} from '@angular/material/legacy-radio';
import {
	MatRippleModule,
} from '@angular/material/core';
import {
	MatLegacySelectModule as MatSelectModule,
} from '@angular/material/legacy-select';
import {

	MatSidenavModule,
} from '@angular/material/sidenav';
import {
	MatLegacySliderModule as MatSliderModule,
} from '@angular/material/legacy-slider';
import {
	MatLegacySnackBarModule as MatSnackBarModule,
} from '@angular/material/legacy-snack-bar';
import {
	MatSortModule,
} from '@angular/material/sort';
import {
	MatLegacyTableModule as MatTableModule,
} from '@angular/material/legacy-table';
import {
	MatLegacyTabsModule as MatTabsModule,
} from '@angular/material/legacy-tabs';
import {
	MatToolbarModule,
} from '@angular/material/toolbar';
import {
	MatLegacyTooltipModule as MatTooltipModule,
} from '@angular/material/legacy-tooltip';
import {
	MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import {
	MatStepperModule,
} from '@angular/material/stepper';
import {
	MatLegacyCardModule as MatCardModule,
} from '@angular/material/legacy-card';
import {
	MatLegacyCheckboxModule as MatCheckboxModule,
} from '@angular/material/legacy-checkbox';
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
