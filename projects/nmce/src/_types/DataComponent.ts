export interface DataComponent {
	data: any
}

export interface PrintDataComponent extends DataComponent {
	reportName: string,
	printTime: Date,
}
