import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { SessionV1 } from './SessionV1';

export interface ISessionsClientV1 {
    getSessions(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SessionV1>) => void): void;
    
    getSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void;

    openSession(correlationId: string, user_id: string, user_name: string,
        address: string, client: string, user: any, data: any,
        callback: (err: any, session: SessionV1) => void): void;
    
    storeSessionData(correlationId: string, sessionId: string, data: any,
        callback: (err: any, session: SessionV1) => void): void;
    
    closeSession(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void;

    deleteSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void;
}
