export interface DataComponent {
	data: any
}

export interface PrintDataComponent extends DataComponent {
	reportName: string,
	printTime: Date,
}

export interface TransmitProgress {
	message?: string,
	loaded?: number,
}
