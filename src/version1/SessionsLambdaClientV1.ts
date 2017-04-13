import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableLambdaClient } from 'pip-services-aws-node';

import { SessionV1 } from './SessionV1';
import { ISessionsClientV1 } from './ISessionsClientV1';

export class SessionsLambdaClientV1 extends CommandableLambdaClient implements ISessionsClientV1 {

    constructor(config?: any) {
        super('sessions');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public getSessions(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SessionV1>) => void): void {
        this.callCommand(
            'get_sessions',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }
    
    public getSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        this.callCommand(
            'get_session_by_id',
            correlationId,
            {
                session_id: sessionId
            }, 
            callback
        );
    }

    public openSession(correlationId: string, userId: string, userName: string,
        address: string, client: string, user: any, data: any,
        callback: (err: any, session: SessionV1) => void): void {
        this.callCommand(
            'open_session',
            correlationId,
            {
                user_id: userId,
                user_name: userName,
                address: address,
                client: client,
                user: user,
                data: data
            }, 
            callback
        );
    }
    
    public storeSessionData(correlationId: string, sessionId: string, data: any,
        callback: (err: any, session: SessionV1) => void): void {
        this.callCommand(
            'store_session_data',
            correlationId,
            {
                session_id: sessionId,
                data: data
            }, 
            callback
        );
    }
    
    public closeSession(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        this.callCommand(
            'close_session',
            correlationId,
            {
                session_id: sessionId
            }, 
            callback
        );
    }

    public deleteSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        this.callCommand(
            'delete_session_by_id',
            correlationId,
            {
                session_id: sessionId
            }, 
            callback
        );
    }
    
}
