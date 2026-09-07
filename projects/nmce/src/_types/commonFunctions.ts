import { ElementRef, Renderer2 } from "@angular/core";
import { AlertSubjectMessage } from "../_ui_services/types";

export function rerenderAlertMessage(msg: AlertSubjectMessage | undefined | null, el: ElementRef<any> | undefined, renderer: Renderer2): void {
	function openLinksInNewTab(root: HTMLElement): void {
		root.querySelectorAll('a[href]').forEach(a => {
			renderer.setAttribute(a, 'target', '_blank');
			renderer.setAttribute(a, 'rel', 'noopener noreferrer');
		});
	}

	if (!msg || !el) 
		return;

	const nativeEl = el.nativeElement;

	if (msg.contentType === 'html') {
		if (msg.status || msg.status === 0) {
			// srcdoc = its own isolated document → <base> is correctly scoped here
			renderer.setProperty(nativeEl, 'srcdoc', '<base target="_blank">' + msg.text);
		} else {
			// injected straight into the app's own document → no <base> scoping possible
			renderer.setProperty(nativeEl, 'innerHTML', msg.text);
			openLinksInNewTab(nativeEl);
		}
	} else if (msg.contentType === 'json' && msg.status! >= 0) {
		renderer.setProperty(nativeEl, 'srcdoc', '<base target="_blank"><pre>' + msg.text + '</pre>');
	} else if (msg.contentType === 'text') {
		renderer.setProperty(nativeEl, 'srcdoc', '<base target="_blank"><pre>' + msg.text + '</pre>');
	}
}

export function rerenderTextContent(msg: string | undefined | null, el: ElementRef<any> | undefined, renderer: Renderer2): void {
	function openLinksInNewTab(root: HTMLElement): void {
		root.querySelectorAll('a[href]').forEach(a => {
			renderer.setAttribute(a, 'target', '_blank');
			renderer.setAttribute(a, 'rel', 'noopener noreferrer');
		});
	}

	if (!msg || !el) 
		return;

	const nativeEl = el.nativeElement;
	renderer.setProperty(nativeEl, 'srcdoc', '<base target="_blank"><pre>' + msg + '</pre>');
}

