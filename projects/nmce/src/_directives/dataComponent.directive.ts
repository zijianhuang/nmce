import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[dataComponentHost]',
})
export class DataComponentDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
