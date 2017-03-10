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
var SessionsSenecaClient = (function (_super) {
    __extends(SessionsSenecaClient, _super);
    function SessionsSenecaClient(config) {
        _super.call(this, SessionsSenecaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    SessionsSenecaClient.prototype.getSessions = function (correlationId, userId, callback) {
        callback = this.instrument(correlationId, 'sessions.get_sessions', callback);
        this.call('sessions', 'get_sessions', {
            correlation_id: correlationId,
            user_id: userId
        }, callback);
    };
    SessionsSenecaClient.prototype.loadSession = function (correlationId, userId, sessionId, callback) {
        callback = this.instrument(correlationId, 'sessions.load_session', callback);
        this.call('sessions', 'load_session', {
            correlation_id: correlationId,
            user_id: userId,
            session_id: sessionId
        }, callback);
    };
    SessionsSenecaClient.prototype.openSession = function (correlationId, user, address, client, data, callback) {
        callback = this.instrument(correlationId, 'sessions.open_session', callback);
        this.call('sessions', 'open_session', {
            correlation_id: correlationId,
            user: user,
            address: address,
            client: client,
            data: data
        }, callback);
    };
    SessionsSenecaClient.prototype.storeSessionData = function (correlationId, userId, sessionId, data, callback) {
        callback = this.instrument(correlationId, 'sessions.store_session_data', callback);
        this.call('sessions', 'store_session_data', {
            correlation_id: correlationId,
            user_id: userId,
            session_id: sessionId,
            data: data
        }, callback);
    };
    SessionsSenecaClient.prototype.closeSession = function (correlationId, userId, address, client, callback) {
        callback = this.instrument(correlationId, 'sessions.close_session', callback);
        this.call('sessions', 'close_session', {
            correlation_id: correlationId,
            user_id: userId,
            address: address,
            client: client
        }, callback);
    };
    SessionsSenecaClient.prototype.deleteSession = function (correlationId, userId, sessionId, callback) {
        callback = this.instrument(correlationId, 'sessions.delete_session', callback);
        this.call('sessions', 'delete_session', {
            correlation_id: correlationId,
            user_id: userId,
            session_id: sessionId
        }, callback);
    };
    /**
     * Unique descriptor for the SessionsSenecaClient component
     */
    SessionsSenecaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-sessions", "seneca", "1.0");
    return SessionsSenecaClient;
}(pip_services_runtime_node_5.SenecaClient));
exports.SessionsSenecaClient = SessionsSenecaClient;
