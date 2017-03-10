import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

let Version1 = require('../version1');

export class SessionsFactory extends ComponentFactory {
	public static Instance: SessionsFactory = new SessionsFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(Version1.SessionsNullClient.Descriptor, Version1.SessionsNullClient);
		this.register(Version1.SessionsRestClient.Descriptor, Version1.SessionsRestClient);
		this.register(Version1.SessionsSenecaClient.Descriptor, Version1.SessionsSenecaClient);
		this.register(Version1.SessionsLambdaClient.Descriptor, Version1.SessionsLambdaClient);
	}
	
}
