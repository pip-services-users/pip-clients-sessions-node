import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';
import { ISessionsClientV1 } from './ISessionsClientV1';
import { SessionV1 } from './SessionV1';
export declare class SessionsDirectClientV1 extends DirectClient<any> implements ISessionsClientV1 {
    constructor(config?: any);
    getSessions(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SessionV1>) => void): void;
    getSessionById(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
    openSession(correlationId: string, userId: string, userName: string, address: string, client: string, user: any, data: any, callback: (err: any, session: SessionV1) => void): void;
    storeSessionData(correlationId: string, sessionId: string, data: any, callback: (err: any, session: SessionV1) => void): void;
    updateSessionUser(correlationId: string, sessionId: string, user: any, callback: (err: any, session: SessionV1) => void): void;
    closeSession(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
    deleteSessionById(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
}
