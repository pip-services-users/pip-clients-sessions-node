"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var SessionsLambdaClient = (function (_super) {
    __extends(SessionsLambdaClient, _super);
    function SessionsLambdaClient(config) {
        _super.call(this, SessionsLambdaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    SessionsLambdaClient.prototype.getSessions = function (correlationId, userId, callback) {
        callback = this.instrument(correlationId, 'sessions.get_sessions', callback);
        this.call('get_sessions', {
            correlation_id: correlationId,
            user_id: userId
        }, callback);
    };
    SessionsLambdaClient.prototype.loadSession = function (correlationId, userId, sessionId, callback) {
        callback = this.instrument(correlationId, 'sessions.load_session', callback);
        this.call('load_session', {
            correlation_id: correlationId,
            user_id: userId,
            session_id: sessionId
        }, callback);
    };
    SessionsLambdaClient.prototype.openSession = function (correlationId, user, address, client, data, callback) {
        callback = this.instrument(correlationId, 'sessions.open_session', callback);
        this.call('open_session', {
            correlation_id: correlationId,
            user: user,
            address: address,
            client: client,
            data: data
        }, callback);
    };
    SessionsLambdaClient.prototype.storeSessionData = function (correlationId, userId, sessionId, data, callback) {
        callback = this.instrument(correlationId, 'sessions.store_session_data', callback);
        this.call('store_session_data', {
            correlation_id: correlationId,
            user_id: userId,
            session_id: sessionId,
            data: data
        }, callback);
    };
    SessionsLambdaClient.prototype.closeSession = function (correlationId, userId, address, client, callback) {
        callback = this.instrument(correlationId, 'sessions.close_session', callback);
        this.call('close_session', {
            correlation_id: correlationId,
            user_id: userId,
            address: address,
            client: client
        }, callback);
    };
    SessionsLambdaClient.prototype.deleteSession = function (correlationId, userId, sessionId, callback) {
        callback = this.instrument(correlationId, 'sessions.delete_session', callback);
        this.call('delete_session', {
            correlation_id: correlationId,
            user_id: userId,
            session_id: sessionId
        }, callback);
    };
    /**
     * Unique descriptor for the SessionsSenecaClient component
     */
    SessionsLambdaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-sessions", "lambda", "1.0");
    return SessionsLambdaClient;
}(pip_services_runtime_node_5.LambdaClient));
exports.SessionsLambdaClient = SessionsLambdaClient;
