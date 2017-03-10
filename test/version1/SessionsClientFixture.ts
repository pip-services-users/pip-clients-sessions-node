let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ISessionsClient } from '../../src/version1/ISessionsClient';

let USER = {
    id: '123',
    name: 'Test User'
};

export class SessionsClientFixture {
    private _client: ISessionsClient;
    
    constructor(client: ISessionsClient) {
        this._client = client;
    }
        
    testOpenSession(done) {
        var session1;
        
        async.series([
        // Open new session
            (callback) => {
                this._client.openSession(
                    null,
                    USER,
                   'localhost',
                   'test',
                   'abc',
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.id);
                        assert.isNotNull(session.last_request);
                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');
                        assert.equal(session.data, 'abc');

                        session1 = session;
                        
                        callback();
                    }
                );
            },
        // Store session data
            (callback) => {
                this._client.storeSessionData(
                    null,
                    USER.id,
                    session1.id,
                    'xyz',
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Load created session
            (callback) => {
                this._client.loadSession(
                    null,
                    USER.id,
                    session1.id,
                    (err, session) => {
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
                    }
                );
            },
        // Get open sessions
            (callback) => {
                this._client.getSessions(
                    null,
                    USER.id,
                    (err, sessions) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(sessions, 1);
                        let session = sessions[0];

                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');

                        callback();
                    }
                );
            }
        ], done);
    }

    testCloseSession(done) {
        async.series([
        // Create a new session
            (callback) => {
                this._client.openSession(
                    null,
                    USER,
                    'localhost',
                    'test',
                    null,
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.last_request);

                        callback();
                    }
                );
            },
        // Close created session
            (callback) => {
                this._client.closeSession(
                    null,
                    USER.id,
                    'localhost',
                    'test',
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                this._client.getSessions(
                    null,
                    USER.id,
                    (err, sessions) => {
                        assert.isNull(err);

                        assert.isArray(sessions || []);

                        callback();
                    }
                );
            }
        ], done);
    }
}
