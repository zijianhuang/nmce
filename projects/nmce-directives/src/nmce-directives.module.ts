import { NgModule } from '@angular/core';
import { AutofocusDirective } from './_directives/autofocus';
import { ScrollIntoDirective } from './_directives/scrollInto.directive';

/**
 * Contain components for apps preferring importing module.
 */
@NgModule({
	imports: [
		AutofocusDirective,
		ScrollIntoDirective
	],

	exports: [
		AutofocusDirective,
		ScrollIntoDirective
	]
})
export class NmceDirectivesModule { }
