let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';

let SessionsMemoryPersistence = require('pip-services-sessions/lib/src/persistence/SessionsMemoryPersistence').SessionsMemoryPersistence;
let SessionsController = require('pip-services-sessions/lib/src/logic/SessionsController').SessionsController;
let SessionsSenecaService = require('pip-services-sessions/lib/src/services/version1/SessionsSenecaService').SessionsSenecaService;

import { SessionsSenecaClient } from '../../src/version1/SessionsSenecaClient';
import { SessionsClientFixture } from './SessionsClientFixture';

suite('SessionsSenecaClient', ()=> {        
    let db = new SessionsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new SessionsController();
    ctrl.configure(new ComponentConfig());

    let service = new SessionsSenecaService();
    service.configure(new ComponentConfig());

    let client = new SessionsSenecaClient();
    client.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    let fixture = new SessionsClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
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