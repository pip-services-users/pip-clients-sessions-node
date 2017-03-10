"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var Version1 = require('../version1');
var SessionsFactory = (function (_super) {
    __extends(SessionsFactory, _super);
    function SessionsFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(Version1.SessionsNullClient.Descriptor, Version1.SessionsNullClient);
        this.register(Version1.SessionsRestClient.Descriptor, Version1.SessionsRestClient);
        this.register(Version1.SessionsSenecaClient.Descriptor, Version1.SessionsSenecaClient);
        this.register(Version1.SessionsLambdaClient.Descriptor, Version1.SessionsLambdaClient);
    }
    SessionsFactory.Instance = new SessionsFactory();
    return SessionsFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.SessionsFactory = SessionsFactory;
