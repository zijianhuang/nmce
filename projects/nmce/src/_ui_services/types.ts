
export enum DialogSize { Auto, Large, Medium, Smart }

/**
 * When smart, return useBackButton ? '98' + hw : undefined.
 * @param size
 * @param useBackButton
 * @param vwvh vw or vh
 */
export const DialogSizeToSize = (size?: DialogSize, useBackButton?: boolean, vwvh?: string) => {
	switch (size) {
		case DialogSize.Auto: return undefined;
		case DialogSize.Large: return '98' + vwvh;
		case DialogSize.Medium: return '50' + vwvh;
		case DialogSize.Smart: return useBackButton ? '98' + vwvh : undefined;
		default:
			return undefined;
	};
}

// a duplicated definition like the one defined at the server side.
export interface ActionSheetItem {
	actionId?: string;
	actionLabel?: string;
	actionType?: string;
	message?: string;
	timeUtc?: Date;
}

export interface AlertSubjectMessage {
	text?: string;

	/**
	 * success, info, error, warning, response
	 */
	type?: 'success' | 'info' | 'error' | 'warning' | 'response';

	/**
	 * Optionally describe title which is translated from type. Such as explaning the source of the message.
	 */
	subtitle?: string;

	/**
	 * Whether to display in snackbar
	 */
	snackBar?: boolean;

	contentType?: 'text' | 'html' | 'json';

	/**
	 * Describe the status of HTTP message.
	 */
	status?: number;

	statusText?: string;
}
