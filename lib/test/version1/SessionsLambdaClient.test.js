"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SessionsLambdaClient_1 = require('../../src/version1/SessionsLambdaClient');
var SessionsClientFixture_1 = require('./SessionsClientFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var clientOptions = options.get('clients');
clientOptions = _.isArray(clientOptions) ? clientOptions : [clientOptions];
var lambdaOptions = _.find(clientOptions, function (o) {
    return (o.type || (o.identity || {}).type) == 'lambda';
});
suite('SessionsLambdaClient', function () {
    // Skip test if lambda is not configured
    if (lambdaOptions == null)
        return;
    var config = pip_services_runtime_node_2.ComponentConfig.fromValue(lambdaOptions);
    var client = new SessionsLambdaClient_1.SessionsLambdaClient();
    client.configure(config);
    var fixture = new SessionsClientFixture_1.SessionsClientFixture(client);
    suiteSetup(function (done) {
        client.link(new pip_services_runtime_node_1.ComponentSet());
        client.open(done);
    });
    suiteTeardown(function (done) {
        client.close(done);
    });
    test('Open Session', function (done) {
        fixture.testOpenSession(done);
    });
    test('Close Session', function (done) {
        fixture.testCloseSession(done);
    });
});
