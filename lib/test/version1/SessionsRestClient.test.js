"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SessionsMemoryPersistence = require('pip-services-sessions/lib/src/persistence/SessionsMemoryPersistence').SessionsMemoryPersistence;
var SessionsController = require('pip-services-sessions/lib/src/logic/SessionsController').SessionsController;
var SessionsRestService = require('pip-services-sessions/lib/src/services/version1/SessionsRestService').SessionsRestService;
var SessionsRestClient_1 = require('../../src/version1/SessionsRestClient');
var SessionsClientFixture_1 = require('./SessionsClientFixture');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.protocol', 'http', 'endpoint.host', 'localhost', 'endpoint.port', 3000);
suite('SessionsRestClient', function () {
    var db = new SessionsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new SessionsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new SessionsRestService();
    service.configure(restConfig);
    var client = new SessionsRestClient_1.SessionsRestClient();
    client.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service);
    var fixture = new SessionsClientFixture_1.SessionsClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Open Session', function (done) {
        fixture.testOpenSession(done);
    });
    test('Close Session', function (done) {
        fixture.testCloseSession(done);
    });
});
