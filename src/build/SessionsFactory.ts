import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { SessionsNullClientV1 } from '../version1/SessionsNullClientV1';
import { SessionsDirectClientV1 } from '../version1/SessionsDirectClientV1';
import { SessionsHttpClientV1 } from '../version1/SessionsHttpClientV1';
import { SessionsSenecaClientV1 } from '../version1/SessionsSenecaClientV1';

export class SessionsFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-sessions', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-sessions', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-sessions', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-sessions', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-sessions', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(SessionsFactory.NullClientV1Descriptor, SessionsNullClientV1);
		this.registerAsType(SessionsFactory.DirectClientV1Descriptor, SessionsDirectClientV1);
		this.registerAsType(SessionsFactory.HttpClientV1Descriptor, SessionsHttpClientV1);
		this.registerAsType(SessionsFactory.SenecaClientV1Descriptor, SessionsSenecaClientV1);
	}
	
}
