import { Pipe, PipeTransform } from '@angular/core';
import { StringFunc } from 'nmce-func';

/**
 * Pad number with zero
 */
@Pipe({
    name: 'pad',
    standalone: true
})
export class PadPipe implements PipeTransform {
	transform(n: number, length: number): string {
		return StringFunc.pad(n, length);
	}
}
