let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { SessionsMemoryPersistence } from 'pip-services-sessions-node';
import { SessionsController } from 'pip-services-sessions-node';
import { SessionsHttpServiceV1 } from 'pip-services-sessions-node';
import { ISessionsClientV1 } from '../../src/version1/ISessionsClientV1';
import { SessionsHttpClientV1 } from '../../src/version1/SessionsHttpClientV1';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SessionsHttpClientV1', ()=> {
    let service: SessionsHttpServiceV1;
    let client: SessionsHttpClientV1;
    let fixture: SessionsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sessions', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new SessionsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new SessionsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('Open Session', (done) => {
        fixture.testOpenSession(done);
    });

    test('Close Session', (done) => {
        fixture.testCloseSession(done);
    });

});
