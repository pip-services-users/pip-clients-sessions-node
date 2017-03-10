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
var SessionsRestClient = (function (_super) {
    __extends(SessionsRestClient, _super);
    function SessionsRestClient(config) {
        _super.call(this, SessionsRestClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    SessionsRestClient.prototype.getSessions = function (correlationId, userId, callback) {
        callback = this.instrument(correlationId, 'sessions.get_sessions', callback);
        this.call('get', '/sessions/' + userId, {
            correlation_id: correlationId
        }, callback);
    };
    SessionsRestClient.prototype.loadSession = function (correlationId, userId, sessionId, callback) {
        callback = this.instrument(correlationId, 'sessions.load_session', callback);
        this.call('get', '/sessions/' + userId, {
            correlation_id: correlationId,
            session_id: sessionId
        }, callback);
    };
    SessionsRestClient.prototype.openSession = function (correlationId, user, address, client, data, callback) {
        callback = this.instrument(correlationId, 'sessions.open_session', callback);
        this.call('post', '/sessions', {
            correlation_id: correlationId
        }, {
            user: user,
            address: address,
            client: client,
            data: data
        }, callback);
    };
    SessionsRestClient.prototype.storeSessionData = function (correlationId, userId, sessionId, data, callback) {
        callback = this.instrument(correlationId, 'sessions.store_session_data', callback);
        this.call('post', '/sessions/' + userId, {
            correlation_id: correlationId,
            session_id: sessionId
        }, {
            data: data
        }, callback);
    };
    SessionsRestClient.prototype.closeSession = function (correlationId, userId, address, client, callback) {
        callback = this.instrument(correlationId, 'sessions.close_session', callback);
        this.call('delete', '/sessions/' + userId, {
            correlation_id: correlationId,
            address: address,
            client: client
        }, callback);
    };
    SessionsRestClient.prototype.deleteSession = function (correlationId, userId, sessionId, callback) {
        callback = this.instrument(correlationId, 'sessions.delete_session', callback);
        this.call('delete', '/sessions/' + userId, {
            correlation_id: correlationId,
            session_id: sessionId
        }, callback);
    };
    /**
     * Unique descriptor for the SessionsRestClient component
     */
    SessionsRestClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-sessions", "rest", "1.0");
    return SessionsRestClient;
}(pip_services_runtime_node_5.RestClient));
exports.SessionsRestClient = SessionsRestClient;
