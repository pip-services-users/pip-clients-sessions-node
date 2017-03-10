"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var USER = {
    id: '123',
    name: 'Test User'
};
var SessionsClientFixture = (function () {
    function SessionsClientFixture(client) {
        this._client = client;
    }
    SessionsClientFixture.prototype.testOpenSession = function (done) {
        var _this = this;
        var session1;
        async.series([
            // Open new session
            function (callback) {
                _this._client.openSession(null, USER, 'localhost', 'test', 'abc', function (err, session) {
                    assert.isNull(err);
                    assert.isObject(session);
                    assert.isNotNull(session.id);
                    assert.isNotNull(session.last_request);
                    assert.equal(session.address, 'localhost');
                    assert.equal(session.client, 'test');
                    assert.equal(session.data, 'abc');
                    session1 = session;
                    callback();
                });
            },
            // Store session data
            function (callback) {
                _this._client.storeSessionData(null, USER.id, session1.id, 'xyz', function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Load created session
            function (callback) {
                _this._client.loadSession(null, USER.id, session1.id, function (err, session) {
                    assert.isNull(err);
                    assert.isObject(session);
                    assert.equal(session.id, session1.id);
                    assert.isNotNull(session.last_request);
                    assert.equal(session.address, 'localhost');
                    assert.equal(session.client, 'test');
                    assert.equal(session.data, 'xyz');
                    assert.isDefined(session.user);
                    assert.equal(session.user.id, USER.id);
                    assert.equal(session.user.name, USER.name);
                    callback();
                });
            },
            // Get open sessions
            function (callback) {
                _this._client.getSessions(null, USER.id, function (err, sessions) {
                    assert.isNull(err);
                    assert.lengthOf(sessions, 1);
                    var session = sessions[0];
                    assert.equal(session.address, 'localhost');
                    assert.equal(session.client, 'test');
                    callback();
                });
            }
        ], done);
    };
    SessionsClientFixture.prototype.testCloseSession = function (done) {
        var _this = this;
        async.series([
            // Create a new session
            function (callback) {
                _this._client.openSession(null, USER, 'localhost', 'test', null, function (err, session) {
                    assert.isNull(err);
                    assert.isObject(session);
                    assert.isNotNull(session.last_request);
                    callback();
                });
            },
            // Close created session
            function (callback) {
                _this._client.closeSession(null, USER.id, 'localhost', 'test', function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Get open sessions
            function (callback) {
                _this._client.getSessions(null, USER.id, function (err, sessions) {
                    assert.isNull(err);
                    assert.isArray(sessions || []);
                    callback();
                });
            }
        ], done);
    };
    return SessionsClientFixture;
}());
exports.SessionsClientFixture = SessionsClientFixture;
