import * as namespaces from '../../clientapi/WebApiNG2ClientAuto';
import APS_WebPos_WebApi_Controllers_ML_Client = namespaces.APS_WebPos_WebApi_Controllers_ML_Client;
import APS_WebPos_Services_ML_Client = namespaces.APS_WebPos_Services_ML_Client;
import APS_WebPos_WebApi_AccountModels_Client = namespaces.APS_WebPos_WebApi_Models_Client;
import APS_WebPos_Services_Client = namespaces.APS_WebPos_Services_Client;


import * as namespacesTasks from '../../clientapi/WebApiNG2TasksClientAuto';
import APS_TasksManager_Service_Controllers_Client = namespacesTasks.APS_TasksManager_Service_Controllers_Client;
import APS_WebPos_WebApi_Models_Client = namespacesTasks.APS_WebPos_WebApi_Models_Client;
import APS_TasksManager_Core_Client = namespacesTasks.APS_TasksManager_Core_Client;
import APS_WebPos_WebApi_Client = namespaces.APS_WebPos_WebApi_Client;

/**
 * For displaying appointments grouped in the same date
 */
export interface Ml_appointmentsGroupedByDate {
	date: Date;
	items: Ml_appointmentAndInterval[];
}

/**
 * For displaying appointments with interval between
 */
export interface Ml_appointmentAndInterval {
	appointment: APS_WebPos_Services_ML_Client.ML_Appointment;
	interval: number;
}

export interface ML_AppointmentSummaryEx extends APS_WebPos_Services_ML_Client.ML_AppointmentSummary {
	tasksCount?: number;
}

/**
 * For signalR push about appointments changes.
 */
export interface ML_appointmentsAltered { user: string; startUtc: Date; }

export interface TaskIdFired { taskId: string; }

export interface TaskItemEx extends APS_TasksManager_Core_Client.TaskItem {
	commentsCount?: number;
	attachmentsCount?: number;
}

export interface TasksGroupedByDate {
	[key: number]: TaskItemEx[];
}

export interface TasksAltered {
	user: string;
}

export enum FuturePast { Past = -1, Today = 0, Future = 1 }

export interface UserItemExChecked extends APS_WebPos_WebApi_AccountModels_Client.UserItemEx {
	checked: boolean;
}
export interface LookupOption {
	id: string;
	display: string;
}

/**
 * For legacy with conduit
 */
export interface Practice extends APS_WebPos_Services_Client.BizEntity {
	department?: string;

	/**
	 * 8 digit Practice Management Software Location ID
	 */
	locationId?: string;
	hpI_O?: string;
}

export interface AppointmentEx extends APS_WebPos_Services_Client.Appointment {
	patientName: string;
	practitionerName: string;
	invoiceIds: Array<{ item1: number, item2: number }>;
}

export interface AppointmentSummaryEx extends APS_WebPos_Services_Client.AppointmentSummary {
	assigneeName?: string;
	creatorName?: string;
	interval?: number;
	tasksCount?: number;
}

export interface AppointmentsGroupedByDate {
	date: Date;
	items: AppointmentSummaryEx[];
}

export interface InvoicesGroupedByDate {
	[key: number]: APS_WebPos_Services_Client.Invoice[];
}

export interface InvoiceItemRpGroupedByItem {
	[key: string]: APS_WebPos_Services_Client.InvoiceItemRp[];
}

export interface LetterTemplate {
	id: string;
	name?: string;
	template?: string;
	templateType?: string;
}

export interface InvoiceBriefEx extends APS_WebPos_WebApi_Client.InvoiceBrief {
	checked: boolean;
}
