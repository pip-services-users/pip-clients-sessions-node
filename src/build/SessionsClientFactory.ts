import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { SessionsNullClientV1 } from '../version1/SessionsNullClientV1';
import { SessionsDirectClientV1 } from '../version1/SessionsDirectClientV1';
import { SessionsHttpClientV1 } from '../version1/SessionsHttpClientV1';

export class SessionsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-sessions', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-sessions', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-sessions', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-sessions', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(SessionsClientFactory.NullClientV1Descriptor, SessionsNullClientV1);
		this.registerAsType(SessionsClientFactory.DirectClientV1Descriptor, SessionsDirectClientV1);
		this.registerAsType(SessionsClientFactory.HttpClientV1Descriptor, SessionsHttpClientV1);
	}
	
}
