import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataComponent, HtmlDialogService, HtmlFrameDialogService, HtmlFramePrintDialogService, HtmlHRefDialogService, HtmlHRefFrameDialogService, HtmlHRefFramePrintDialogService, HtmlHRefPrintDialogService, HtmlImgDialogService, HtmlImgPrintDialogService, HtmlPrintDialogService } from 'nmce';
/**
 * Users search and list
 */
@Component({
	templateUrl: 'htmlDialogs.component.html',
})
export class HtmlDialogsComponent implements DataComponent {
	useBackButton: boolean;
	useLargeHtml = false;
	useLargeImg = false;
	sizeSelectedControl: FormControl = new FormControl(1);

	data: any;

	showLarge=false;

	constructor(
		private http: HttpClient,
		private htmlDialogService: HtmlDialogService,
		private htmlHRefDialogService: HtmlHRefDialogService,
		private htmlHRefFrameDialogService: HtmlHRefFrameDialogService,
		private htmlImgDialogService: HtmlImgDialogService,
		private htmlFrameDialogService: HtmlFrameDialogService,

		private htmlPrintDialogService: HtmlPrintDialogService,
		private htmlHRefPrintDialogService: HtmlHRefPrintDialogService,
		private htmlHRefFramePrintDialogService: HtmlHRefFramePrintDialogService,
		private htmlImgPrintDialogService: HtmlImgPrintDialogService,
		private htmlFramePrintDialogService: HtmlFramePrintDialogService,

	) {
		this.showLarge=true;
	}

	showHtmlDialog() {
		if (this.useLargeHtml) {
			this.http.get('https://jsonapi.org/extensions/', { headers: { Accept: 'text/html' }, responseType: 'text' }).subscribe(
				s => this.htmlDialogService.open({
					title: 'HTML Large Content',
					htmlContent: s,
					size: this.sizeSelectedControl.value,
					useBackButton: this.useBackButton
				}),
				error => console.error(error)
			);
		} else {
			this.htmlDialogService.open({
				title: 'HTML Content',
				htmlContent: 'Info <strong>OK <a target="_blank" href="https://material.angular.io/components/categories">Please check this.</a></strong>',
				size: this.sizeSelectedControl.value,
				useBackButton: this.useBackButton
			})
		}
	}

	showHtmlHRefDialog() {
		this.htmlHRefDialogService.open({
			title: 'HTML HRef Content',
			url: 'https://jsonapi.org/extensions/',
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		});
	}

	showHtmlHRefFrameDialog() {
		this.htmlHRefFrameDialogService.open({
			title: 'HTML HRef Frame Content',
			url: 'https://jsonapi.org/extensions/',
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		});
	}

	showHtmlFrameDialog() {
		this.htmlFrameDialogService.open({
			title: 'HTML Frame Content',
			htmlContent: 'Info <strong>OK <a target="_blank" href="https://material.angular.io/components/categories">Please check this.</a></strong>',
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		});
	}

	showHtmlImgDialog() {
		const imgUrl = this.useLargeImg ? 'https://upload.wikimedia.org/wikipedia/commons/7/75/Anselm_Feuerbach_-_Das_Gastmahl._Nach_Platon_%28zweite_Fassung%29_-_Google_Art_Project.jpg'
			: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Platon.png';
		this.htmlImgDialogService.open({
			title: 'HTML Img Content',
			imageUrl: imgUrl,
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		});
	}


	showHtmlPrintDialog() {
		if (this.useLargeHtml) {
			this.http.get('https://jsonapi.org/extensions/', { headers: { Accept: 'text/html' }, responseType: 'text' }).subscribe(
				s => this.htmlPrintDialogService.open({
					title: 'HTML Large Content',
					htmlContent: s,
					size: this.sizeSelectedControl.value,
					useBackButton: this.useBackButton
				}),
				error => console.error(error)
			);
		} else {
			this.htmlPrintDialogService.open({
				title: 'HTML Content',
				htmlContent: 'Info <strong>OK <a target="_blank" href="https://material.angular.io/components/categories">Please check this.</a></strong>',
				size: this.sizeSelectedControl.value,
				useBackButton: this.useBackButton
			})
		}
	}

	showHtmlHRefPrintDialog() {
		this.htmlHRefPrintDialogService.open({
			title: 'HTML HRef Content',
			url: 'https://jsonapi.org/extensions/',
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		});
	}

	showHtmlHRefFramePrintDialog() {
		this.htmlHRefFramePrintDialogService.open({
			title: 'HTML HRef Frame Content',
			url: 'https://jsonapi.org/extensions/',
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		});
	}

	showHtmlFramePrintDialog() {
		this.htmlFramePrintDialogService.open({
			title: 'HTML Frame Content',
			htmlContent: 'Info <strong>OK <a target="_blank" href="https://material.angular.io/components/categories">Please check this.</a></strong>',
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		});
	}

	showHtmlImgPrintDialog() {
		const imgUrl = this.useLargeImg ? 'https://upload.wikimedia.org/wikipedia/commons/7/75/Anselm_Feuerbach_-_Das_Gastmahl._Nach_Platon_%28zweite_Fassung%29_-_Google_Art_Project.jpg'
			: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Platon.png';
		this.htmlImgPrintDialogService.open({
			title: 'HTML Img Content',
			imageUrl: imgUrl,
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		});
	}


}
