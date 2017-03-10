declare module 'pip-clients-sessions-node' {
	import { IClient } from 'pip-services-runtime-node';
	import { RestClient } from 'pip-services-runtime-node';
	import { LambdaClient } from 'pip-services-runtime-node';
	import { SenecaClient } from 'pip-services-runtime-node';
	import { ComponentDescriptor } from 'pip-services-runtime-node';
	import { ComponentFactory } from 'pip-services-runtime-node';

    export class SessionsFactory extends ComponentFactory {
        public static Instance: SessionsFactory;	
        constructor();	
    }

    module Version1 {
        export interface ISessionsClient extends IClient {
            getSessions(correlationId: string, userId: string, callback: any): void;
            loadSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
            openSession(correlationId: string, user: any, address: string, client: string, data: any, callback: any): void;
            storeSessionData(correlationId: string, userId: string, sessionId: string, data: any, callback: any);
            closeSession(correlationId: string, userId: string, address: string, client: string, callback: any): void;
            deleteSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
        }

        export class SessionsRestClient extends RestClient implements ISessionsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getSessions(correlationId: string, userId: string, callback: any): void;
            loadSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
            openSession(correlationId: string, user: any, address: string, client: string, data: any, callback: any): void;
            storeSessionData(correlationId: string, userId: string, sessionId: string, data: any, callback: any);
            closeSession(correlationId: string, userId: string, address: string, client: string, callback: any): void;
            deleteSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
        }

        export class SessionsLambdaClient extends LambdaClient implements ISessionsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getSessions(correlationId: string, userId: string, callback: any): void;
            loadSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
            openSession(correlationId: string, user: any, address: string, client: string, data: any, callback: any): void;
            storeSessionData(correlationId: string, userId: string, sessionId: string, data: any, callback: any);
            closeSession(correlationId: string, userId: string, address: string, client: string, callback: any): void;
            deleteSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
        }

        export class SessionsSenecaClient extends SenecaClient implements ISessionsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getSessions(correlationId: string, userId: string, callback: any): void;
            loadSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
            openSession(correlationId: string, user: any, address: string, client: string, data: any, callback: any): void;
            storeSessionData(correlationId: string, userId: string, sessionId: string, data: any, callback: any);
            closeSession(correlationId: string, userId: string, address: string, client: string, callback: any): void;
            deleteSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
        }
    }
}
