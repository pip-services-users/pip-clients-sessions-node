"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var SessionsMemoryPersistence = require('pip-services-sessions/lib/src/persistence/SessionsMemoryPersistence').SessionsMemoryPersistence;
var SessionsController = require('pip-services-sessions/lib/src/logic/SessionsController').SessionsController;
var SessionsSenecaService = require('pip-services-sessions/lib/src/services/version1/SessionsSenecaService').SessionsSenecaService;
var SessionsSenecaClient_1 = require('../../src/version1/SessionsSenecaClient');
var SessionsClientFixture_1 = require('./SessionsClientFixture');
suite('SessionsSenecaClient', function () {
    var db = new SessionsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new SessionsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new SessionsSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var client = new SessionsSenecaClient_1.SessionsSenecaClient();
    client.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_4.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    var fixture = new SessionsClientFixture_1.SessionsClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_3.LifeCycleManager.close(components, done);
        });
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
