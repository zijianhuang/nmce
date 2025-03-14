import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dataComponentHost]',
    standalone: false
})
export class DataComponentDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
