let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { RestClient } from 'pip-services-runtime-node';

import { ISessionsClient } from './ISessionsClient';

export class SessionsRestClient extends RestClient implements ISessionsClient {       
	/**
	 * Unique descriptor for the SessionsRestClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-sessions", "rest", "1.0"
	);
    
    constructor(config?: any) {
        super(SessionsRestClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getSessions(correlationId: string, userId: string, callback) {
        callback = this.instrument(correlationId, 'sessions.get_sessions', callback);
        
        this.call('get', 
            '/sessions/' + userId, 
            {
                correlation_id: correlationId
            }, 
            callback
        );
    }

    public loadSession(correlationId: string, userId: string, sessionId: string, callback) {
        callback = this.instrument(correlationId, 'sessions.load_session', callback);
        
        this.call('get', 
            '/sessions/' + userId,
            {
                correlation_id: correlationId,
                session_id: sessionId
            }, 
            callback
        );        
    }

    public openSession(correlationId: string, user: any, address: string, client: string, data: any, callback) {
        callback = this.instrument(correlationId, 'sessions.open_session', callback);
        
        this.call('post', 
            '/sessions',
            {
                correlation_id: correlationId
            }, 
            {
                user: user,
                address: address,
                client: client,
                data: data
            }, 
            callback
        );
    }

    public storeSessionData(correlationId: string, userId: string, sessionId: string, data: any, callback) {
        callback = this.instrument(correlationId, 'sessions.store_session_data', callback);
        
        this.call('post', 
            '/sessions/' + userId,
            {
                correlation_id: correlationId,
                session_id: sessionId
            }, 
            {
                data: data
            }, 
            callback
        );        
    }

    public closeSession(correlationId: string, userId: string, address: string, client: string, callback) {
        callback = this.instrument(correlationId, 'sessions.close_session', callback);
        
        this.call('delete', 
            '/sessions/' + userId, 
            {
                correlation_id: correlationId,
                address: address,
                client: client
            }, 
            callback
        );
    }

    public deleteSession(correlationId: string, userId: string, sessionId: string, callback) {
        callback = this.instrument(correlationId, 'sessions.delete_session', callback);

        this.call('delete', 
            '/sessions/' + userId, 
            {
                correlation_id: correlationId,
                session_id: sessionId
            }, 
            callback
        );
    }
    
}
