import {
	Component, ElementRef, Inject, InjectionToken, Renderer2,
	ChangeDetectionStrategy, viewChild, signal, afterRenderEffect
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { AlertSubjectMessage } from './types';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface MessageDialogOptions {
	useIcon?: boolean;
	useTitle?: boolean;
}

export const LOG_DIALOG_OPTIONS = new InjectionToken<MessageDialogOptions>('Dialog Options', {
	providedIn: 'root',
	factory: () => ({ useIcon: false, useTitle: true })
});

@Component({
	templateUrl: 'logDialog.component.html',
	styleUrls: ['../../../components-styles/nmce-styles.css', '../../../components-styles/nmce-colors.css', '../../../components-styles/nmce-flex.css'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, CommonModule, MatIconModule]
})
export class LogDialogComponent {

	// message is now a signal - the template reads it as message()
	readonly message = signal<AlertSubjectMessage | undefined>(undefined);

	// signal-based query: re-evaluated on every render, not just once at AfterViewInit
	readonly htmlContentElement = viewChild<ElementRef>('htmlContent');

	constructor(
		@Inject(LOG_DIALOG_OPTIONS) public dialogOptions: MessageDialogOptions,
		@Inject(MAT_DIALOG_DATA) data: { message: AlertSubjectMessage },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
		private renderer: Renderer2,
	) {
		this.message.set(data.message);

		// Runs once the element+message are both available, and again any time
		// either changes - no more relying on a single AfterViewInit pass.
		afterRenderEffect({
			write: () => {
				const msg = this.message();
				const el = this.htmlContentElement();
				if (!msg || !el) return;

				const nativeEl = el.nativeElement;

				if (msg.contentType === 'html') {
					if (msg.status || msg.status === 0) {
						this.renderer.setProperty(nativeEl, 'srcdoc', msg.text);
					} else {
						this.renderer.setProperty(nativeEl, 'innerHTML', msg.text);
					}
				} else if (msg.contentType === 'json' && msg.status! >= 0) {
					this.renderer.setProperty(nativeEl, 'srcdoc', '<pre>' + msg.text + '</pre>');
				} else if (msg.contentType === 'text') {
					this.renderer.setProperty(nativeEl, 'srcdoc', '<pre>' + msg.text + '</pre>');
				}
			}
		});
	}

	get title(): string | undefined {
		const msg = this.message();
		if (!msg) return undefined;
		switch (msg.type) {
			case 'success': return 'Success';
			case 'info': return 'Info';
			case 'warning': return 'Warning';
			case 'error': return 'Error';
			case 'notify': return 'Notification';
			case 'response': return 'Response';
			default: return 'Info';
		}
	}

	get titleIcon(): string | undefined {
		const msg = this.message();
		if (!msg) return undefined;
		const iconMapping = { info: 'info', success: 'star', warning: 'warning', error: 'error', response: 'chat', notify: 'notifications' };
		return msg.type ? iconMapping[msg.type] : undefined;
	}

	get iconColor(): string | undefined {
		const msg = this.message();
		if (!msg) return undefined;
		const colorMapping = { info: 'primary', success: 'primary', warning: 'accent', error: 'warn', response: 'primary', notify: 'primary' };
		return msg.type ? colorMapping[msg.type] : undefined;
	}

	get useIcon(): boolean | undefined {
		return this.dialogOptions && this.dialogOptions.useIcon;
	}

	get useTitle(): boolean {
		return (this.dialogOptions && this.dialogOptions.useTitle) || !this.dialogOptions || (!this.dialogOptions.useIcon && !this.dialogOptions.useTitle);
	}

	get subtitle(): string | undefined {
		return this.message()?.subtitle;
	}

	get messageType(): string {
		return this.message()?.type ?? '';
	}
}