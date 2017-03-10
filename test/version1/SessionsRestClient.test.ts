let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

let SessionsMemoryPersistence = require('pip-services-sessions/lib/src/persistence/SessionsMemoryPersistence').SessionsMemoryPersistence;
let SessionsController = require('pip-services-sessions/lib/src/logic/SessionsController').SessionsController;
let SessionsRestService = require('pip-services-sessions/lib/src/services/version1/SessionsRestService').SessionsRestService;

import { SessionsRestClient } from '../../src/version1/SessionsRestClient';
import { SessionsClientFixture } from './SessionsClientFixture';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.protocol', 'http',
    'endpoint.host', 'localhost',
    'endpoint.port', 3000
);

suite('SessionsRestClient', ()=> {    
    let db = new SessionsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new SessionsController();
    ctrl.configure(new ComponentConfig());

    let service = new SessionsRestService();
    service.configure(restConfig);

    let client = new SessionsRestClient();
    client.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, client, service);
    let fixture = new SessionsClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Open Session', (done) => {
        fixture.testOpenSession(done);
    });

    test('Close Session', (done) => {
        fixture.testCloseSession(done);
    });
});