export class HtmlFunc {
	/**
	 * Print with buillt-in CSS for internal reports
	 * @param htmlTags
	 * @param baseRef
	 */
	static printWithCSS(htmlTags: string, baseRef: string) {
		if (window) {
			const htmlToPrint = `<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
<link rel="stylesheet" type="text/css" href="${baseRef}scripts/print190826.css" media="screen,print"/>
</head><body onload="window.print()">${htmlTags}</body></html>`;

			const popup = window.open('', '_blank', 'width=1024,height=768');
			popup.document.open();
			popup.document.write(htmlToPrint);

			popup.document.close();
		}
		return true;
	}

	/**
	 * Print for external documents.
	 * @param htmlTags
	 */
	static print(htmlTags: string) {
		if (window) {
			const htmlToPrint = `<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
</head><body onload="window.print()">${htmlTags}</body></html>`;

			const popup = window.open('', '_blank', 'width=1024,height=768');
			popup.document.open();
			popup.document.write(htmlToPrint);

			popup.document.close();
		}
		return true;
	}

	static printImage(url: string) {
		const imageTags = `<img src="${url}" alt="Image from URL"/>`;
		HtmlFunc.print(imageTags);
	}
}
