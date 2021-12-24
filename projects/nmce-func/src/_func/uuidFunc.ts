import { v4 as uuid } from 'uuid'; //todo: somehow  the system could not recognize v5.
// import { v5 as uuid } from 'uuid/v5 causes ERROR in src / app / _func / helperFunc.ts(1, 10): error TS2305: Module '"C:/VSProjects/ApsCloudTrunk/APS.WebPos.NGCli/NGSource/node_modules/@types/uuid/v5"' has no exported member 'v5'
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/28439

export class UuidFunc {
	/**
	 * 36 UUID string including 4 hyphens. MySql stores GUID as 36 bytes anyway rather than 16bytes.
	 */
	static newUUID(): string {
//		return uuid('medilink.com.au', 'apscloud');
		return uuid();
	}

	static newUUIDStartWith0() {
		const s = uuid();
		return '0000' + s.slice(4);
	}
}
