let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { SessionsMemoryPersistence } from 'pip-services-sessions-node';
import { SessionsController } from 'pip-services-sessions-node';
import { SessionsSenecaServiceV1 } from 'pip-services-sessions-node';
import { ISessionsClientV1 } from '../../src/version1/ISessionsClientV1';
import { SessionsSenecaClientV1 } from '../../src/version1/SessionsSenecaClientV1';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('SessionsSenecaClient', () => {
    let service: SessionsSenecaServiceV1;
    let client: SessionsSenecaClientV1;
    let fixture: SessionsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sessions', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new SessionsSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
