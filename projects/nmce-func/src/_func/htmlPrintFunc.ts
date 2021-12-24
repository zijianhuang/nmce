export class HtmlPrintFunc {
	/**
	 * Print with CSS for internal reports
	 * @param htmlTags
	 * @param cssUrl
	 */
	static printWithCSS(htmlTags: string, cssUrl: string) {
		if (window) {
			const htmlToPrint = `<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
<link rel="stylesheet" type="text/css" href="${cssUrl}" media="screen,print"/>
</head><body onload="window.print()">${htmlTags}</body></html>`;

			const popup = window.open('', '_blank', 'width=1024,height=768');
			popup?.document.open();
			popup?.document.write(htmlToPrint);

			popup?.document.close();
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
			popup?.document.open();
			popup?.document.write(htmlToPrint);

			popup?.document.close();
		}
		return true;
	}

	/**
	 * Print image url through html img.
	 * @param url 
	 */
	static printImage(url: string) {
		const imageTags = `<img src="${url}" alt="Image from URL"/>`;
		HtmlPrintFunc.print(imageTags);
	}
}
